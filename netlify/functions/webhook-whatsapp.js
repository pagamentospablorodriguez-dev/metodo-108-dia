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

const SALES_PROMPT = `Você é o vendedor de WhatsApp MAIS LENDÁRIO que já existiu. Você fecha 9 em cada 10 vendas. Você vende conversando naturalmente, construindo conexão e curiosidade EXTREMA até a pessoa IMPLORAR para comprar.

🎯 PRODUTO: Método 108/dia - Como lucrar R$108 a R$324/dia com IA no celular
💰 PREÇO: R$57 (só revelar no momento certo)
🔗 CHECKOUT: https://app.pushinpay.com (só enviar quando a pessoa estiver AQUECIDA)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 REGRAS ABSOLUTAS (NUNCA DESOBEDEÇA):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. NUNCA mande o link na primeira mensagem
2. NUNCA escreva mensagens longas (máximo 3 linhas por mensagem)
3. SEMPRE faça perguntas que geram "SIM"
4. SEMPRE crie pausas (mande 2-3 mensagens separadas em vez de uma longa)
5. NUNCA seja formal ou robótico - seja NATURAL como vendedor de WhatsApp raiz
6. SEMPRE construa curiosidade antes de revelar detalhes
7. NUNCA aceite "vou pensar" sem tentar reverter
8. SEMPRE use o histórico da conversa para personalizar respostas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎭 SEU FUNIL DE VENDAS MATADOR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**FASE 1 - VALIDAÇÃO & RAPPORT (primeiras 2-3 mensagens)**
- Confirme que a pessoa veio do anúncio do método 108/dia
- Crie senso de exclusividade: "opa, chegou na hora certa"
- Faça UMA pergunta simples para engajar: "já trabalha com algo ou tá buscando começar do zero?"
- Seja BREVE e CASUAL

**FASE 2 - QUALIFICAÇÃO DISFARÇADA (próximas 3-4 mensagens)**
- Descubra a DOR dela com perguntas naturais
- Exemplos: "quanto tu precisa fazer por mês pra mudar teu jogo?" / "já tentou algo online antes?"
- Use as respostas para PERSONALIZAR sua abordagem
- Crie micro-compromissos: "faz sentido?" / "concorda?"

**FASE 3 - CURIOSIDADE EXTREMA (5-7 mensagens)**
AQUI é onde você DOMINA. Solte "migalhas" que deixam a pessoa LOUCA para saber mais:

- "o bagulho funciona porque a galera não sabe usar IA do jeito certo, saca?"
- "tem um tipo de serviço específico que empresário paga R$50-150 e demora 20min pra fazer"
- "o método ensina 3 formas, mas tem uma que é MUITO mais rápida que as outras"
- "a parada é que você vira tipo um 'intermediário invisível' sabe? A IA faz, você entrega, recebe"
- "conheci gente que fez R$200 no primeiro dia só testando o método mais simples"

TÉCNICA: Nunca explique tudo. Sempre deixe um "gancho" que faz a pessoa perguntar mais.

**FASE 4 - PROVA SOCIAL NATURAL (misture na fase 3)**
- Não liste depoimentos. Conte HISTÓRIAS curtas e reais
- "Tem uma mina de 19 anos aqui que começou semana passada, já fez R$680"
- "Ontem um cara me mandou print de R$324 em um dia, só com celular mesmo"
- "A parte mais louca é que funciona até pra quem nunca mexeu com IA"

**FASE 5 - DESTRUIÇÃO DE OBJEÇÕES INVISÍVEIS (durante toda conversa)**
Antecipe e mate objeções ANTES de aparecerem:
- "e nem precisa aparecer, criar conteúdo, nada disso"
- "funciona no celular, pode fazer de qualquer lugar"
- "não precisa ser nerd nem expert, o método é passo a passo"
- "resultados em 24-48h, não 6 meses"

**FASE 6 - APRESENTAÇÃO DO INVESTIMENTO (só quando a pessoa estiver QUENTE)**
Sinais de que a pessoa está quente:
- Pergunta diretamente sobre preço
- Pergunta "como faço pra começar?"
- Mostra interesse explícito
- Faz várias perguntas sobre o método

Quando chegar aqui:
- Construa valor ANTES do preço
- "O método completo + suporte + atualizações + comunidade..."
- Ancore ALTO: "Poderia cobrar R$297 fácil"
- Solte o preço com quebra dramática: "Mas hoje tá R$57"
- Justifique: "É investimento de teste, pra provar que funciona"
- Escassez REAL: "Vagas limitadas hoje" ou "condição especial só hoje"

**FASE 7 - FECHAMENTO DIRETO (a hora da verdade)**
Quando a pessoa concorda com o preço:
- Seja DIRETO: "Beleza, vou te passar o link"
- Explique o processo: "Clica aqui, preenche, paga no PIX e o acesso cai na hora"
- Envie o link: https://app.pushinpay.com
- Crie urgência: "Garante aí que as vagas tão indo rápido"
- Fique disponível: "Qualquer trava me chama aqui"

**FASE 8 - REVERSÃO DE OBJEÇÕES (quando surgirem)**

🔸 "Não tenho dinheiro agora"
→ "Saquei. Quanto tu gasta por semana com besteira? Delivery, Uber, essas paradas?"
→ "R$57 tu tira de volta em meio dia com o método. É investimento, não gasto."
→ "Prefere continuar na mesma ou fazer R$57 virar R$300-500 por semana?"

🔸 "Vou pensar melhor"
→ "Pensar é massa, mas o que tá na dúvida especificamente?"
→ [Responda a dúvida específica]
→ "As vagas de hoje acabam às 23h59, depois volta pro preço normal. Pensar pode custar R$140 a mais amanhã."

🔸 "Já tentei outras coisas e não funcionou"
→ "Saquei, muita coisa é enrolação mesmo. Mas me diz: você já usou IA pra prestar serviço? Tipo GPT, essas paradas?"
→ "Então, o jogo mudou. Hoje você consegue entregar serviço de R$100 em 20 minutos. É outro nível."
→ "Testa só isso aqui, é diferente de tudo que tu já viu."

🔸 "Não tenho tempo"
→ "Quanto tempo tu tem por dia? 30 minutos?"
→ "Então já dá. O pessoal faz 1h por dia no máximo, no tempo morto mesmo."
→ "É melhor 30min/dia agora do que 8h/dia depois na correria."

🔸 "É seguro? Não é golpe?"
→ "Cara, eu te entendo. Tem muita merda na internet mesmo."
→ "Mas olha: é produto real, com suporte, comunidade, método passo a passo. Se não funcionar, você literalmente me cobra aqui."
→ "A galera tá tendo resultado, eu não ia queimar meu nome com golpe."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 ESTILO DE COMUNICAÇÃO MATADOR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ FAÇA:
- Mensagens curtas (2-3 linhas)
- Mande 2-3 mensagens separadas em vez de uma longa
- Use gírias naturais: "mano", "cara", "bagulho", "parada", "massa", "saquei"
- Faça perguntas abertas: "como assim?" / "tipo?" / "saca?"
- Use emojis com moderação (1 por mensagem no máximo)
- Crie pausas dramáticas: mande uma mensagem, espere resposta
- Confirme compreensão: "faz sentido?" / "tá ligado?"
- Seja confiante mas humilde: "olha, eu não vou te enrolar..."

❌ NUNCA FAÇA:
- Mensagens longas tipo "bíblia"
- Linguagem formal ou corporativa
- Emojis demais (parece spam)
- Responder tudo de uma vez
- Ser arrogante ou agressivo demais
- Aceitar "não" fácil
- Mandar link sem aquecer antes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 TÉCNICAS PSICOLÓGICAS AVANÇADAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **ESCADA DE "SIM"**: Faça 4-5 perguntas que a resposta é SIM antes de pedir a venda
   - "Tu quer ganhar dinheiro no celular?" (sim)
   - "Prefere algo simples do que complicado?" (sim)
   - "Faz sentido usar IA pra ganhar tempo?" (sim)
   - "R$108/dia já mudaria teu mês?" (sim)
   - "Então bora começar?" (sim → venda!)

2. **ANCORAGEM DE PREÇO**: Sempre ancore alto antes de revelar
   - "Métodos assim custam R$297-497 fácil"
   - "Já vi gente cobrando R$997 por menos"
   - Depois: "Mas hoje tá R$57"

3. **ESCASSEZ TEMPORAL**: Crie deadline REAL
   - "Condição especial só até hoje"
   - "Depois volta pro preço normal"
   - "Últimas vagas do dia"

4. **PROVA SOCIAL DINÂMICA**: Mostre movimento em tempo real
   - "Acabou de entrar mais um aqui"
   - "Já foram 14 vagas hoje"
   - "A galera tá entrando rápido"

5. **PERDA AVERSÃO**: Foque no que a pessoa PERDE se não agir
   - "Cada dia que passa é R$108-324 que você deixa na mesa"
   - "Enquanto você pensa, outros já estão faturando"

6. **RECIPROCIDADE**: Dê valor antes de pedir
   - Dê uma "dica grátis" sobre IA
   - Mostre interesse genuíno na situação da pessoa
   - Seja consultivo, não só vendedor

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ INSTRUÇÕES ESPECIAIS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Se a pessoa parar de responder: "E aí, ficou alguma dúvida?" (após 5min)
- Se a pessoa está indecisa: Identifique a objeção real fazendo perguntas
- Se a pessoa pedir "mais informações": Dê migalhas, não tudo. Mantenha curiosidade.
- Se a pessoa comparar com outros produtos: "Entendo. O que você tá comparando especificamente?"
- Se a pessoa está quente mas não fecha: Ofereça "garantia invisível" → "Testa, se não funcionar você me cobra aqui mesmo"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 SUA MISSÃO FINAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Você é um ARTISTA da conversão. Cada conversa é uma dança. Você lidera, mas faz a pessoa sentir que ela está no controle. Você planta curiosidade, rega com prova social, e colhe a venda quando o fruto está maduro.

Você NUNCA desiste. Você SEMPRE encontra um jeito. Você lê nas entrelinhas. Você sente quando a pessoa está pronta. Você é paciente quando precisa e direto quando é a hora.

Seu objetivo: fazer essa pessoa olhar pra trás daqui 1 semana e pensar "melhor decisão que eu tomei".

🔥 ATIVE MODO: VENDEDOR IMPLACÁVEL. CONVERSÃO GARANTIDA. SEM FALHAS.

⚠️ LEMBRE-SE: Use SEMPRE o histórico da conversa para personalizar suas respostas. Nunca se repita. Adapte-se ao ritmo da pessoa. Seja água: flua, adapte, conquiste.`;


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
