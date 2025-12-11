# 🏗️ ARQUITETURA DO SISTEMA

## 📊 DIAGRAMA DE FLUXO

```
┌─────────────────┐
│   META ADS      │
│   (Anúncio)     │
└────────┬────────┘
         │ Lead clica
         ▼
┌─────────────────┐
│   WHATSAPP      │
│  (Lead envia    │
│   mensagem)     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│     EVOLUTION API               │
│  (Recebe mensagem WhatsApp)     │
└────────┬────────────────────────┘
         │ Webhook POST
         ▼
┌──────────────────────────────────────────┐
│         NETLIFY FUNCTION                 │
│     /webhook-whatsapp                    │
│                                          │
│  1. Recebe dados do webhook              │
│  2. Extrai número + mensagem             │
│  3. Busca histórico no Supabase          │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│            SUPABASE                      │
│         (PostgreSQL)                     │
│                                          │
│  SELECT * FROM conversations             │
│  WHERE phone_number = '5511999999999'    │
│                                          │
│  Retorna: histórico completo             │
└────────┬─────────────────────────────────┘
         │ Histórico
         ▼
┌──────────────────────────────────────────┐
│         NETLIFY FUNCTION                 │
│                                          │
│  4. Monta payload para GPT:              │
│     - System prompt (vendedor)           │
│     - Histórico de mensagens             │
│     - Última mensagem do lead            │
└────────┬─────────────────────────────────┘
         │ API Call
         ▼
┌──────────────────────────────────────────┐
│           OPENAI GPT-4o-mini             │
│                                          │
│  Processa com prompt MATADOR             │
│  Aplica estratégias de vendas            │
│  Gera resposta persuasiva                │
│                                          │
│  Retorna: mensagem de vendas             │
└────────┬─────────────────────────────────┘
         │ Resposta da IA
         ▼
┌──────────────────────────────────────────┐
│         NETLIFY FUNCTION                 │
│                                          │
│  5. Aguarda delay humano (3-8s)          │
│  6. Salva resposta no Supabase           │
└────────┬─────────────────────────────────┘
         │ UPDATE
         ▼
┌──────────────────────────────────────────┐
│            SUPABASE                      │
│                                          │
│  UPDATE conversations SET                │
│    messages = messages || nova_msg       │
│    last_message_at = now()               │
│  WHERE phone_number = '5511999999999'    │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│         NETLIFY FUNCTION                 │
│                                          │
│  7. Envia resposta via Evolution API     │
└────────┬─────────────────────────────────┘
         │ API Call
         ▼
┌──────────────────────────────────────────┐
│         EVOLUTION API                    │
│                                          │
│  POST /message/sendText                  │
│  Envia mensagem para o WhatsApp          │
└────────┬─────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│   WHATSAPP      │
│  (Lead recebe   │
│   resposta)     │
└─────────────────┘
         │
         │ Lead responde
         │
         ▼
     REPETE O CICLO
     (até conversão)
```

---

## 🗂️ ESTRUTURA DE DADOS

### Tabela: `conversations`

```sql
CREATE TABLE conversations (
  id uuid PRIMARY KEY,
  phone_number text UNIQUE,          -- Ex: "5511999999999"
  name text,                         -- Ex: "João Silva"
  messages jsonb,                    -- Array de mensagens
  last_message_at timestamptz,       -- Última interação
  status text,                       -- 'active', 'converted', 'cold'
  created_at timestamptz,
  updated_at timestamptz
);
```

### Estrutura do campo `messages` (JSONB):

```json
[
  {
    "role": "user",
    "content": "Quero começar AGORA o método de R$108/dia",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  {
    "role": "assistant",
    "content": "E aí! 🔥 Você chegou no lugar certo...",
    "timestamp": "2024-01-15T10:30:05Z"
  },
  {
    "role": "user",
    "content": "Como funciona?",
    "timestamp": "2024-01-15T10:31:20Z"
  }
]
```

---

## 🔧 COMPONENTES DO SISTEMA

### 1. Netlify Function (webhook-whatsapp.js)

**Responsabilidades:**
- Receber webhook do Evolution
- Validar dados recebidos
- Buscar/criar conversa no Supabase
- Chamar OpenAI GPT-4o-mini
- Aplicar delay humano
- Enviar resposta via Evolution
- Salvar histórico

**Endpoints:**
- `POST /.netlify/functions/webhook-whatsapp` → Processa mensagem

**Dependências:**
- `@supabase/supabase-js` → Banco de dados
- `openai` → IA conversacional

### 2. Evolution API (Externa)

**Responsabilidades:**
- Conectar com WhatsApp
- Receber mensagens
- Enviar webhooks
- Enviar mensagens

**Endpoints usados:**
- `POST /message/sendText/{instance}` → Enviar mensagem

**Headers necessários:**
- `apikey`: API Key da Evolution
- `Content-Type`: application/json

### 3. OpenAI API (Externa)

**Responsabilidades:**
- Processar contexto da conversa
- Gerar respostas persuasivas
- Aplicar prompt de vendas

**Modelo:** `gpt-4o-mini`

**Parâmetros:**
- `temperature`: 0.9 (criatividade alta)
- `max_tokens`: 300 (respostas concisas)
- `presence_penalty`: 0.6 (evita repetição)
- `frequency_penalty`: 0.5 (variação)

### 4. Supabase (Banco de Dados)

**Responsabilidades:**
- Armazenar histórico completo
- Tracking de conversas
- Métricas e analytics

**Queries principais:**
```sql
-- Buscar conversa
SELECT * FROM conversations WHERE phone_number = $1;

-- Criar conversa
INSERT INTO conversations (phone_number, name, messages) VALUES ($1, $2, $3);

-- Atualizar conversa
UPDATE conversations SET
  messages = $1,
  last_message_at = now(),
  updated_at = now()
WHERE phone_number = $2;
```

---

## 🔐 VARIÁVEIS DE AMBIENTE

| Variável | Usado em | Propósito |
|----------|----------|-----------|
| `SUPABASE_URL` | Netlify Function | Conectar ao banco |
| `SUPABASE_SERVICE_ROLE_KEY` | Netlify Function | Autenticar (bypass RLS) |
| `OPENAI_API_KEY` | Netlify Function | Chamar GPT-4o-mini |
| `EVOLUTION_API_URL` | Netlify Function | Enviar mensagens |
| `EVOLUTION_API_KEY` | Netlify Function | Autenticar na Evolution |
| `EVOLUTION_INSTANCE` | Netlify Function | Nome da instância |

---

## 📡 FORMATO DOS WEBHOOKS

### Evolution → Netlify (Entrada)

```json
{
  "event": "messages.upsert",
  "instance": "vendas-bot",
  "data": {
    "key": {
      "remoteJid": "5511999999999@s.whatsapp.net",
      "fromMe": false,
      "id": "BAE5F6F7E8F9G0H1"
    },
    "pushName": "João Silva",
    "message": {
      "conversation": "Quero começar AGORA o método"
    },
    "messageTimestamp": 1704567890
  }
}
```

### Netlify → Evolution (Saída)

```json
{
  "number": "5511999999999",
  "text": "E aí! 🔥 Você chegou no lugar certo..."
}
```

---

## ⚡ FLUXO DE TEMPO

```
T = 0ms        Lead envia mensagem
               ↓
T = 100ms      Evolution recebe
               ↓
T = 150ms      Evolution envia webhook
               ↓
T = 200ms      Netlify recebe webhook
               ↓
T = 250ms      Busca histórico Supabase (50ms)
               ↓
T = 300ms      Envia para OpenAI
               ↓
T = 1500ms     OpenAI responde (1200ms)
               ↓
T = 1550ms     Salva no Supabase (50ms)
               ↓
T = 5550ms     Aguarda delay humano (4000ms aleatório)
               ↓
T = 5600ms     Envia via Evolution (50ms)
               ↓
T = 5650ms     Evolution envia para WhatsApp
               ↓
T = 5700ms     Lead recebe resposta

TEMPO TOTAL: ~5.7 segundos
```

---

## 🔄 ESTADOS DA CONVERSA

```
┌──────────┐
│   NEW    │  Lead nunca falou antes
└────┬─────┘
     │
     ▼
┌──────────┐
│  ACTIVE  │  Conversando ativamente
└────┬─────┘
     │
     ├─────────┐
     │         │
     ▼         ▼
┌──────────┐  ┌──────────┐
│CONVERTED │  │   COLD   │  Parou de responder
└──────────┘  └────┬─────┘
               │
               ▼
          (follow-up
           futuro)
```

---

## 📊 CUSTOS E PERFORMANCE

### Custo por Conversa

```
1 conversa = ~20 mensagens (10 do lead + 10 do bot)

OpenAI GPT-4o-mini:
- Input: ~2000 tokens (histórico + prompt)
- Output: ~150 tokens (resposta)
- Custo: ~$0.0003 por conversa
- Em reais: ~R$0.0015

1000 conversas/mês = R$1.50
```

### Performance

```
Webhook Netlify:
- Cold start: ~500ms (primeira chamada)
- Warm: ~50ms (chamadas seguintes)
- Timeout: 10s (padrão Netlify)

Supabase:
- Query SELECT: ~20-50ms
- Query UPDATE: ~30-60ms

OpenAI:
- GPT-4o-mini: ~800-1500ms

TOTAL por mensagem: ~2-3 segundos + delay humano (3-8s)
```

### Limites

```
Netlify Free:
- 125k requests/mês
- Suficiente para: ~125k mensagens/mês

Supabase Free:
- 500MB storage
- 2GB bandwidth/mês
- Suficiente para: ~100k conversas

OpenAI:
- Depende do crédito
- $5 = ~16.000 conversas
```

---

## 🔒 SEGURANÇA

### Dados Sensíveis
- ✅ Todas as API Keys em variáveis de ambiente
- ✅ Nunca expostas no código
- ✅ Service Role Key (acesso total ao Supabase)

### Webhook
- ✅ Valida estrutura dos dados
- ✅ Ignora mensagens do próprio bot (fromMe)
- ✅ Tratamento de erros

### Banco de Dados
- ✅ RLS habilitado (sem policies = sem acesso público)
- ✅ Apenas Service Role tem acesso
- ✅ Dados criptografados em repouso

---

## 🚀 ESCALABILIDADE

### Atual (MVP)
- Suporta: ~1000 conversas/dia
- Custo: ~R$30-50/mês

### Médio Porte
- Suporta: ~10.000 conversas/dia
- Necessário: Upgrade Netlify Pro ($19/mês)
- Custo total: ~$50-70/mês

### Grande Escala
- Suporta: ~100.000 conversas/dia
- Necessário:
  - Netlify Pro
  - Supabase Pro
  - OpenAI com limite alto
- Custo total: ~$300-500/mês

---

## 🛠️ MANUTENÇÃO

### Logs
- Netlify Functions: Logs em tempo real no dashboard
- Supabase: Query logs disponíveis
- OpenAI: Usage dashboard

### Monitoramento
```sql
-- Conversas por hora
SELECT
  date_trunc('hour', created_at) as hora,
  COUNT(*) as conversas
FROM conversations
WHERE created_at > now() - interval '24 hours'
GROUP BY hora
ORDER BY hora DESC;

-- Taxa de conversão
SELECT
  status,
  COUNT(*) as quantidade
FROM conversations
GROUP BY status;
```

### Backup
- Supabase: Backup automático diário (plano pago)
- Código: GitHub (versionado)

---

**Sistema robusto, escalável e pronto para produção!** 🚀
