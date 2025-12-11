const testWebhook = async () => {
  const webhookUrl = 'http://localhost:8888/.netlify/functions/webhook-whatsapp';

  const mockEvolutionWebhook = {
    event: 'messages.upsert',
    instance: 'sua-instancia',
    data: {
      key: {
        remoteJid: '5511999999999@s.whatsapp.net',
        fromMe: false,
        id: 'BAE5F6F7E8F9G0H1'
      },
      pushName: 'João Silva',
      message: {
        conversation: 'Quero começar AGORA o método de R$108/dia no celular. Qual é o primeiro passo?'
      },
      messageTimestamp: Math.floor(Date.now() / 1000)
    }
  };

  try {
    console.log('Enviando webhook de teste...\n');
    console.log('Payload:', JSON.stringify(mockEvolutionWebhook, null, 2));

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockEvolutionWebhook)
    });

    const result = await response.json();

    console.log('\n✅ Resposta do webhook:');
    console.log('Status:', response.status);
    console.log('Body:', JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('❌ Erro ao testar webhook:', error.message);
    console.error('\nCertifique-se de que:');
    console.error('1. Você rodou: npm run dev');
    console.error('2. As variáveis de ambiente estão configuradas');
    console.error('3. O Supabase está acessível');
  }
};

console.log('🧪 TESTE DE WEBHOOK - Método 108/dia\n');
console.log('Este script testa o webhook localmente simulando uma mensagem do Evolution API\n');

testWebhook();
