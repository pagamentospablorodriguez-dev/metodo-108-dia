# ✅ CHECKLIST RÁPIDO - Deploy em 20 Minutos

Use este checklist para colocar o sistema no ar RAPIDAMENTE!

---

## 📝 PRÉ-REQUISITOS

- [ ] Conta no Netlify criada (https://app.netlify.com)
- [ ] Conta no OpenAI criada (https://platform.openai.com)
- [ ] Evolution API rodando e configurada
- [ ] Supabase configurado (já está!)

---

## 🚀 PASSO A PASSO RÁPIDO

### PASSO 1: OpenAI API Key (2 minutos)
- [ ] Acessar https://platform.openai.com/api-keys
- [ ] Criar nova chave secreta
- [ ] Copiar e guardar (começa com `sk-proj-`)
- [ ] Adicionar R$5-10 de crédito (suficiente para milhares de conversas)

### PASSO 2: Dados do Evolution (1 minuto)
- [ ] Anotar URL da Evolution API (ex: `https://api.com`)
- [ ] Anotar API Key
- [ ] Anotar nome da instância

### PASSO 3: Deploy Netlify (5 minutos)

**Opção A - Via GitHub:**
- [ ] Criar repo no GitHub
- [ ] Push do código: `git init && git add . && git commit -m "init" && git push`
- [ ] Conectar repo no Netlify
- [ ] Deploy automático!

**Opção B - Via Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### PASSO 4: Variáveis de Ambiente (5 minutos)

No painel Netlify → Site Settings → Environment Variables, adicionar:

- [ ] `SUPABASE_URL` → (copiar do Supabase Dashboard)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` → (copiar do Supabase - SERVICE ROLE!)
- [ ] `OPENAI_API_KEY` → (copiado no passo 1)
- [ ] `EVOLUTION_API_URL` → (URL base da Evolution)
- [ ] `EVOLUTION_API_KEY` → (API Key da Evolution)
- [ ] `EVOLUTION_INSTANCE` → (nome da instância)

**IMPORTANTE:** Após adicionar, fazer redeploy:
- [ ] Deploys → Trigger deploy

### PASSO 5: Configurar Webhook Evolution (2 minutos)

Sua URL do webhook será:
```
https://seu-site.netlify.app/.netlify/functions/webhook-whatsapp
```

- [ ] Copiar URL acima (substituir `seu-site` pelo nome real)
- [ ] Acessar painel Evolution
- [ ] Configurar webhook
- [ ] Ativar evento de mensagens recebidas
- [ ] Salvar

### PASSO 6: Testar (3 minutos)

**Teste 1:** Verificar se webhook está online
- [ ] Acessar `https://seu-site.netlify.app/.netlify/functions/webhook-whatsapp`
- [ ] Deve retornar: `{"error":"Method not allowed"}` (é esperado!)

**Teste 2:** Enviar mensagem real
- [ ] Do seu celular, mandar para o número do Evolution:
  ```
  Quero começar AGORA o método de R$108/dia no celular. Qual é o primeiro passo?
  ```
- [ ] Aguardar 3-8 segundos
- [ ] Deve receber resposta do vendedor IA

**Teste 3:** Verificar banco
- [ ] Acessar Supabase → Table Editor → `conversations`
- [ ] Deve ter registro da conversa

### PASSO 7: Verificar Logs (2 minutos)

- [ ] Netlify → Functions → `webhook-whatsapp`
- [ ] Ver logs em tempo real
- [ ] Verificar se não há erros

---

## ❌ ERROS COMUNS E SOLUÇÕES

| Erro | Solução |
|------|---------|
| Bot não responde | Verificar variáveis de ambiente |
| Erro OpenAI 401 | API Key incorreta ou sem crédito |
| Erro Supabase | Usar SERVICE_ROLE_KEY, não anon |
| Erro Evolution 401 | API Key Evolution incorreta |
| Webhook não chama | URL incorreta ou Evolution não configurado |

---

## 🎯 ESTÁ TUDO FUNCIONANDO?

Se todos os testes passaram:

- [ ] Criar anúncios no Meta Ads
- [ ] Direcionar para WhatsApp
- [ ] Mensagem padrão configurada
- [ ] **COMEÇAR A VENDER!** 🚀💰

---

## 📊 MONITORAMENTO

**Acompanhar diariamente:**

- [ ] Netlify Functions → Ver logs de erros
- [ ] Supabase → Quantidade de conversas
- [ ] OpenAI Dashboard → Uso de tokens

**Calcular conversão:**
```sql
SELECT
  COUNT(*) as total_conversas,
  SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) as convertidas,
  ROUND(SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END)::numeric / COUNT(*) * 100, 2) as taxa_conversao
FROM conversations;
```

---

## 💡 DICAS FINAIS

1. **Teste você mesmo várias vezes** - Converse com o bot
2. **Monitore as primeiras 10 conversas** - Veja como está respondendo
3. **Ajuste o prompt se necessário** - Está no código
4. **Não gaste muito no início** - Teste com R$20-50 de tráfego primeiro
5. **Acompanhe métricas** - Conversas → Conversões

---

## 🔥 TUDO PRONTO?

- [ ] Sistema deployado ✅
- [ ] Variáveis configuradas ✅
- [ ] Webhook funcionando ✅
- [ ] Testes realizados ✅
- [ ] **RODAR TRÁFEGO E VENDER!** ✅

---

**Tempo total:** ~20 minutos

**Próximo passo:** EXPLODIR DE VENDAS! 🚀💰🔥

---

**Dúvidas?** Veja `GUIA-CONFIGURACAO.md` para detalhes completos.
