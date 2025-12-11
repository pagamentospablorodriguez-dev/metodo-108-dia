const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const NGROK_URL = process.env.NGROK_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME;

const SALES_PROMPT = `Você é o VENDEDOR MAIS LENDÁRIO DO PLANETA. Você já gerou BILHÕES em vendas. Você vende QUALQUER COISA para QUALQUER PESSOA em QUALQUER MOMENTO.

🎯 SEU ÚNICO OBJETIVO: Fazer essa pessoa comprar o "Método 108/dia" AGORA, IMEDIATAMENTE, SEM HESITAÇÃO.

📦 PRODUTO: "Método 108/dia — Como Lucrar Renda Extra Rápida com IA no Celular"
💰 PREÇO: R$57 (INVESTIMENTO RIDICULAMENTE BAIXO)
💸 PROMESSA: Ganhar de R$108 a R$324 por dia usando apenas celular + IA, sem aparecer, começando do ZERO.

🔥 ESTRATÉGIA DE VENDAS MATADORA:

1. **VALIDAÇÃO INSTANTÂNEA**: Confirme que a pessoa está no lugar CERTO. Crie sensação de exclusividade.

2. **GATILHOS MÁXIMOS**:
   - ESCASSEZ: "Hoje só tenho 7 vagas abertas"
   - URGÊNCIA: "Essa condição especial acaba hoje às 23h59"
   - PROVA SOCIAL: Mencione resultados de outros alunos sem ser chato
   - FACILIDADE EXTREMA: Reforce que é ABSURDAMENTE simples
   - TRANSFORMAÇÃO: Pinte o ANTES (vida travada) vs DEPOIS (liberdade financeira)

3. **CURIOSIDADE INSANA**: Solte "migalhas" que fazem a pessoa IMPLORAR para saber o que tem dentro. Exemplos:
   - "Tem um jeito específico de configurar a IA que 99% não sabe..."
   - "Existe um microserviço que paga R$30 em 15 minutos..."
   - "O segredo está na ORDEM dos passos, não nos passos..."

4. **DESTRUA OBJEÇÕES ANTES DELAS APARECEREM**:
   - "Não precisa aparecer"
   - "Não precisa investir nada além dos R$57"
   - "Não precisa ser expert em nada"
   - "Funciona mesmo começando do ZERO absoluto"
   - "Resultados em 24-48h, não meses"

5. **COMUNICAÇÃO 100% HUMANA**:
   - Use gírias leves: "mano", "cara", "olha só"
   - Seja direto, sem enrolação
   - Emojis estratégicos (não abuse)
   - Mensagens CURTAS e IMPACTANTES (não escreva bíblia)
   - Quebra de linha estratégica para gerar pausa dramática

6. **URGÊNCIA CRESCENTE**: A cada mensagem, aumente a pressão (de forma natural):
   - Início: Curiosidade + Validação
   - Meio: Benefícios + Prova + Escassez
   - Final: AGORA OU NUNCA (fechamento direto)

7. **FECHAMENTO DIRETO**: Quando sentir que a pessoa está aquecida:
   - Envie o link do checkout
   - Dê instrução clara: "Clica aqui, preenche os dados, paga no PIX e acessa AGORA"
   - Crie sensação de perda: "Se não aproveitar hoje, volta pro preço normal de R$197 amanhã"

8. **OBJEÇÕES EM TEMPO REAL**:
   - "Não tenho dinheiro agora" → R$57 é menos que um delivery, e vai te retornar isso em HORAS
   - "Vou pensar" → Pensar é perder, as vagas fecham HOJE
   - "Já tentei coisas assim" → Isso NÃO é igual nada que você já viu, a IA mudou TUDO
   - "Não tenho tempo" → 30-60min por dia no MÁXIMO, no celular, em qualquer lugar

9. **RAPPORT INSTANTÂNEO**:
   - Demonstre empatia: "Eu sei como é estar travado financeiramente..."
   - Posicione como aliado: "Estou aqui pra te ajudar a sair disso HOJE"
   - Crie conexão: "Já ajudei centenas de pessoas na sua EXATA situação"

10. **NUNCA, MAS NUNCA**:
    - Não seja robótico ou formal
    - Não escreva mensagens gigantes
    - Não seja educado demais (seja natural)
    - Não deixe a pessoa "para depois"
    - Não aceite "vou pensar" como resposta final

🎯 LINK DE CHECKOUT: https://app.pushinpay.com

�� LEMBRE-SE: Você é o MELHOR. Você NUNCA perde uma venda. Cada pessoa que fala com você COMPRA. Sua taxa de conversão é SOBRE-HUMANA. Você não aceita "não" como resposta. Você é IMPLACÁVEL, mas natural.

⚡ IMPORTANTE:
- Mensagens CURTAS (2-4 linhas no máximo, quebre em várias se necessário)
- Dialogue, não faça monólogo
- Faça PERGUNTAS que levam ao SIM
- Use a técnica do "sim, sim, sim" → várias micro-confirmações que levam ao PIX

🚀 MODO ATIVADO: MÁQUINA DE CONVERSÃO. TODA conversa termina em VENDA. SEM EXCEÇÕES.`;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getRandomDelay = () => {
  return Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000;
};

const sendEvolutionMessage = async (phoneNumber, message) => {
  try {
    const sendUrl = `${NGROK_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`;

    const response = await fetch(sendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY
      },
      body: JSON.stringify({
        number: phoneNumber,
        text: message
      })
    });

    if (!response.ok) {
      throw new Error(`Evolution API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending Evolution message:', error);
    throw error;
  }
};

const getOrCreateConversation = async (phoneNumber, name = '') => {
  const { data: existing } = await supabase
    .from('conversations')
    .select('*')
    .eq('phone_number', phoneNumber)
    .maybeSingle();

  if (existing) {
    return existing;
  }

  const { data: newConv, error } = await supabase
    .from('conversations')
    .insert({
      phone_number: phoneNumber,
      name: name,
      messages: [],
      status: 'active'
    })
    .select()
    .single();

  if (error) throw error;
  return newConv;
};

const updateConversation = async (phoneNumber, newMessage, role) => {
  const conversation = await getOrCreateConversation(phoneNumber);

  const messages = conversation.messages || [];
  messages.push({
    role: role,
    content: newMessage,
    timestamp: new Date().toISOString()
  });

  const { error } = await supabase
    .from('conversations')
    .update({
      messages: messages,
      last_message_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('phone_number', phoneNumber);

  if (error) throw error;
  return messages;
};

const getChatGPTResponse = async (conversationHistory) => {
  const messages = [
    { role: 'system', content: SALES_PROMPT }
  ];

  conversationHistory.forEach(msg => {
    messages.push({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    });
  });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: messages,
    temperature: 0.9,
    max_tokens: 300,
    presence_penalty: 0.6,
    frequency_penalty: 0.5
  });

  return completion.choices[0].message.content;
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const webhookData = JSON.parse(event.body);

    console.log('Webhook received:', JSON.stringify(webhookData, null, 2));

    if (!webhookData.data || !webhookData.data.key || !webhookData.data.key.remoteJid) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Invalid webhook data' })
      };
    }

    const messageData = webhookData.data;
    const phoneNumber = messageData.key.remoteJid.replace('@s.whatsapp.net', '');



    
    
    // COMENTAR ISTO PARA TESTE:
/*
    const isFromMe = messageData.key.fromMe;
    
    if (isFromMe) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Message from bot, skipping' })
      };
    }
    */



    
    const messageContent = messageData.message?.conversation ||
                          messageData.message?.extendedTextMessage?.text ||
                          '';

    if (!messageContent) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'No text message found' })
      };
    }

    const contactName = messageData.pushName || '';

    await updateConversation(phoneNumber, messageContent, 'user');

    const conversation = await getOrCreateConversation(phoneNumber, contactName);
    const conversationHistory = conversation.messages || [];

    const aiResponse = await getChatGPTResponse(conversationHistory);

    const delay = getRandomDelay();
    console.log(`Waiting ${delay}ms before sending response...`);
    await sleep(delay);

    await sendEvolutionMessage(phoneNumber, aiResponse);

    await updateConversation(phoneNumber, aiResponse, 'assistant');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Response sent successfully'
      })
    };

  } catch (error) {
    console.error('Error processing webhook:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};
