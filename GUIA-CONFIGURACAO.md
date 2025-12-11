# 🎯 GUIA COMPLETO DE CONFIGURAÇÃO - Passo a Passo

## 📋 Checklist Rápido

- [ ] Conta Netlify criada
- [ ] OpenAI API Key obtida
- [ ] Evolution API configurada
- [ ] Variáveis de ambiente configuradas no Netlify
- [ ] Deploy realizado
- [ ] Webhook configurado no Evolution
- [ ] Teste realizado

---

## 1️⃣ CONFIGURAR OPENAI

1. Acesse: https://platform.openai.com/
2. Faça login ou crie uma conta
3. Vá em **API Keys** (https://platform.openai.com/api-keys)
4. Clique em **Create new secret key**
5. Copie a chave (começa com `sk-proj-...`)
6. **GUARDE BEM** essa chave - você vai precisar dela

**Custo estimado:** GPT-4o-mini é MUITO barato. Mesmo com 1000 conversas/dia, não passa de alguns dólares.

---

## 2️⃣ CONFIGURAR EVOLUTION API

Se você já tem o Evolution API rodando, pule para o passo 3.

**O que você precisa do Evolution:**
- URL da API (ex: `https://sua-api.com`)
- API Key (chave de autenticação)
- Nome da instância (ex: `vendas-bot`)

**Onde encontrar:**
1. Acesse o painel do seu Evolution
2. Vá nas configurações da instância
3. Copie a API Key
4. Anote o nome da instância

---

## 3️⃣ FAZER DEPLOY NO NETLIFY

### Opção A: Deploy via GitHub (RECOMENDADO)

1. **Criar repositório no GitHub:**
   - Vá em https://github.com/new
   - Nome: `whatsapp-vendas-bot` (ou qualquer nome)
   - Clique em **Create repository**

2. **Fazer push do código:**
   ```bash
   git init
   git add .
   git commit -m "Sistema de vendas WhatsApp - Método 108/dia"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/whatsapp-vendas-bot.git
   git push -u origin main
   ```

3. **Conectar no Netlify:**
   - Acesse: https://app.netlify.com/
   - Clique em **Add new site** → **Import an existing project**
   - Escolha **GitHub**
   - Selecione o repositório `whatsapp-vendas-bot`
   - Clique em **Deploy site**

### Opção B: Deploy via Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Inicializar
netlify init

# Deploy
netlify deploy --prod
```

---

## 4️⃣ CONFIGURAR VARIÁVEIS DE AMBIENTE NO NETLIFY

**SUPER IMPORTANTE:** Sem essas variáveis, nada funciona!

1. No painel da Netlify, vá no seu site
2. Clique em **Site settings** (no menu lateral)
3. Vá em **Environment variables**
4. Clique em **Add a variable** para cada uma dessas:

### Variáveis obrigatórias:

| Variável | Valor | Onde conseguir |
|----------|-------|----------------|
| `SUPABASE_URL` | `https://xxx.supabase.co` | Painel Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` | Painel Supabase → Project Settings → API (⚠️ service_role, não anon!) |
| `OPENAI_API_KEY` | `sk-proj-xxx...` | https://platform.openai.com/api-keys |
| `EVOLUTION_API_URL` | `https://sua-api.com` | URL base da sua Evolution API |
| `EVOLUTION_API_KEY` | `B6D9F...` | Painel Evolution → API Key |
| `EVOLUTION_INSTANCE` | `vendas-bot` | Nome da sua instância no Evolution |

**ATENÇÃO:**
- ✅ Use `SUPABASE_SERVICE_ROLE_KEY` (não a anon key!)
- ✅ `EVOLUTION_API_URL` sem barra no final
- ✅ Copie e cole exatamente, sem espaços

5. Depois de adicionar TODAS, clique em **Deploy** → **Trigger deploy** para aplicar

---

## 5️⃣ CONFIGURAR WEBHOOK NO EVOLUTION

Depois do deploy no Netlify, você terá uma URL tipo:
```
https://seu-site-12345.netlify.app
```

O webhook completo será:
```
https://seu-site-12345.netlify.app/.netlify/functions/webhook-whatsapp
```

**Configurar no Evolution:**

1. Acesse o painel do Evolution
2. Vá na sua instância
3. Procure por **Webhooks** ou **Configurações**
4. Cole a URL completa do webhook
5. Ative eventos de **mensagens recebidas** / **messages.upsert**
6. Salve

---

## 6️⃣ TESTAR O SISTEMA

### Teste 1: Verificar se o webhook está online

Acesse no navegador:
```
https://seu-site.netlify.app/.netlify/functions/webhook-whatsapp
```

Se aparecer `{"error":"Method not allowed"}` = está funcionando! (Ele só aceita POST)

### Teste 2: Enviar mensagem real

1. Do seu celular, envie para o número conectado no Evolution:
   ```
   Quero começar AGORA o método de R$108/dia no celular. Qual é o primeiro passo?
   ```

2. **O que deve acontecer:**
   - Aguardar 3-8 segundos (delay humano)
   - Receber resposta do vendedor IA
   - Resposta deve ser natural, persuasiva e empolgante

### Teste 3: Verificar banco de dados

1. Acesse o Supabase Dashboard
2. Vá em **Table Editor** → `conversations`
3. Você deve ver o histórico da conversa salvo

---

## 7️⃣ VERIFICAR LOGS (se algo der errado)

**No Netlify:**
1. Vá em **Functions** (menu lateral)
2. Clique em `webhook-whatsapp`
3. Veja os logs em tempo real

**Erros comuns:**

| Erro | Causa | Solução |
|------|-------|---------|
| `Cannot read property 'remoteJid'` | Formato do webhook Evolution diferente | Verifique o formato no log e ajuste o código |
| `Invalid API Key (OpenAI)` | API Key incorreta | Reconfigurar variável `OPENAI_API_KEY` |
| `Supabase error` | Service Role Key incorreta | Usar a **service_role** key, não anon |
| `Evolution API error 401` | API Key Evolution incorreta | Reconfigurar `EVOLUTION_API_KEY` |

---

## 8️⃣ RODAR TRÁFEGO

Agora que está tudo funcionando:

1. **Configure seus anúncios no Meta Ads**
2. **Direcione para o WhatsApp**
3. **Mensagem padrão que vem do anúncio:**
   ```
   Quero começar AGORA o método de R$108/dia no celular. Qual é o primeiro passo?
   ```
4. **O bot assume e VENDE!** 🔥💰

---

## 🚨 DICAS IMPORTANTES

1. **Monitore as primeiras conversas** - Ajuste o prompt se necessário
2. **Acompanhe métricas no Supabase** - Quantas conversas, status, etc
3. **Teste você mesmo várias vezes** - Veja como o bot responde
4. **Ajuste o delay se necessário** - Está no código (3000-8000ms)
5. **Custo OpenAI é MUITO baixo** - Não se preocupe com isso

---

## 📊 ACOMPANHAR RESULTADOS

**No Supabase:**
```sql
-- Total de conversas
SELECT COUNT(*) FROM conversations;

-- Conversas por status
SELECT status, COUNT(*) FROM conversations GROUP BY status;

-- Últimas conversas
SELECT phone_number, last_message_at, status
FROM conversations
ORDER BY last_message_at DESC
LIMIT 10;
```

**Calcular taxa de conversão:**
- Conversas com status `converted` / Total de conversas

---

## 💡 OTIMIZAÇÕES FUTURAS

- Adicionar botão de pagamento direto no WhatsApp
- Integrar com Pushinpay API para verificar compras
- Auto-marcar como `converted` quando compra é feita
- Adicionar follow-up automático para quem não comprou
- A/B test de diferentes prompts de vendas

---

## 🆘 PRECISA DE AJUDA?

1. Verifique os logs no Netlify
2. Confira as variáveis de ambiente
3. Teste o webhook manualmente
4. Verifique se o Evolution está enviando webhooks

**Está tudo correto?** Então é só EXPLODIR DE VENDAS! 🚀💰🔥

---

**Sistema criado para VENDER e CONVERTER!**
**Boa sorte com as vendas! 💸**
