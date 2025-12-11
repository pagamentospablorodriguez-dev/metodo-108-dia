# 🚀 Sistema de Vendas WhatsApp - Método 108/dia

Sistema automatizado de vendas via WhatsApp usando Evolution API + ChatGPT 4o-mini + Netlify Functions.

## 🎯 Funcionalidades

- Recebe mensagens do WhatsApp via webhook Evolution API
- Processa conversas com GPT-4o-mini (histórico completo)
- Vendedor MATADOR com prompt ultra persuasivo
- Delay humano aleatório (3-8 segundos) para parecer natural
- Armazena histórico completo no Supabase
- Taxa de conversão otimizada ao MÁXIMO

## 📋 Pré-requisitos

1. **Conta Netlify** (para hospedar o webhook)
2. **Evolution API** configurada e rodando
3. **Conta OpenAI** com acesso ao GPT-4o-mini
4. **Supabase** (já configurado neste projeto)

## ⚙️ Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

No painel da Netlify, vá em **Site settings > Environment variables** e adicione:

```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
EVOLUTION_API_URL=https://sua-evolution-api.com
EVOLUTION_API_KEY=sua-api-key-evolution
EVOLUTION_INSTANCE=nome-da-instancia
```

### 3. Deploy no Netlify

**Opção 1: Via Git**
1. Crie um repositório no GitHub
2. Faça push deste código
3. Conecte o repositório no Netlify
4. Deploy automático!

**Opção 2: Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### 4. Configurar Webhook no Evolution

Após o deploy, você terá uma URL tipo:
```
https://seu-site.netlify.app/.netlify/functions/webhook-whatsapp
```

Configure esta URL no seu Evolution API como webhook para receber mensagens.

**No Evolution API:**
1. Acesse sua instância
2. Configure o webhook URL
3. Ative eventos de mensagens recebidas

## 🎯 Como Funciona

1. **Lead vem do anúncio** → Manda mensagem: "Quero começar AGORA o método de R$108/dia no celular. Qual é o primeiro passo?"

2. **Evolution recebe** → Envia para o webhook Netlify

3. **Webhook processa:**
   - Busca histórico da conversa no Supabase
   - Envia para GPT-4o-mini com prompt MATADOR
   - Aguarda delay humano (3-8s)
   - Responde via Evolution API
   - Salva no histórico

4. **Vendedor GPT:**
   - Usa todas as técnicas de persuasão
   - Gatilhos mentais máximos
   - Conversação 100% natural
   - Foco em conversão IMEDIATA
   - Envia link do checkout no momento certo

## 🔥 Prompt de Vendas

O prompt foi desenvolvido com:
- Técnicas de copywriting avançadas
- Gatilhos mentais (escassez, urgência, prova social, curiosidade)
- Destruição de objeções
- Fechamento agressivo mas natural
- Linguagem 100% humana
- Foco em conversão máxima

## 📊 Banco de Dados

Tabela `conversations`:
- Armazena todo histórico de conversas
- Cada mensagem com timestamp
- Status da conversa (active, converted, cold)
- Busca rápida por número de telefone

## 🛠️ Desenvolvimento Local

```bash
npm run dev
```

Isso iniciará o Netlify Dev Server localmente.

## 📈 Otimizações Implementadas

- Delay aleatório humano (3-8 segundos)
- Mensagens curtas e diretas
- Histórico completo para contexto
- Temperature 0.9 para respostas variadas
- Presence/Frequency penalty para evitar repetição
- Max tokens 300 para respostas concisas

## 🚨 Importante

- O link de checkout é: `https://app.pushinpay.com`
- Produto: Método 108/dia
- Preço: R$57
- Promessa: R$108 a R$324/dia usando celular + IA

## 📝 Estrutura do Projeto

```
.
├── netlify/
│   └── functions/
│       └── webhook-whatsapp.js   # Função principal do webhook
├── netlify.toml                   # Configuração Netlify
├── package.json                   # Dependências
├── .env.example                   # Exemplo de variáveis
└── README.md                      # Este arquivo
```

## 🎯 Próximos Passos

1. Faça deploy no Netlify
2. Configure as variáveis de ambiente
3. Configure o webhook no Evolution
4. Rode seus anúncios no Meta Ads
5. EXPLODA DE VENDAS! 🚀💰

## 💡 Dicas

- Monitore as conversas pelo Supabase Dashboard
- Ajuste o prompt se necessário (arquivo: `webhook-whatsapp.js`)
- Acompanhe taxa de conversão
- Teste o webhook com mensagens reais antes de rodar tráfego

---

**Feito para VENDER e CONVERTER! 💰🔥**
