# 🎯 COMO OTIMIZAR O PROMPT DE VENDAS

Se você quiser ajustar o prompt do vendedor IA para melhorar ainda mais a conversão, use este guia.

---

## 📍 ONDE FICA O PROMPT

**Arquivo:** `netlify/functions/webhook-whatsapp.js`

**Localização:** Variável `SALES_PROMPT` (linha ~33)

---

## 🧪 COMO TESTAR ALTERAÇÕES

1. Editar o arquivo `webhook-whatsapp.js`
2. Fazer commit e push (se usando GitHub)
3. Netlify faz redeploy automático
4. Testar com mensagem real no WhatsApp

**OU** testar localmente:
```bash
npm run dev
node test-webhook.js
```

---

## 🔧 ÁREAS QUE VOCÊ PODE AJUSTAR

### 1. TOM DE VOZ

**Atual:** Informal, direto, usa gírias (mano, cara)

**Para ajustar:**
- Mais profissional → Remover gírias, usar linguagem formal
- Mais agressivo → Adicionar mais urgência e pressão
- Mais suave → Reduzir urgência, adicionar mais empatia

**Onde ajustar:** Seção "COMUNICAÇÃO 100% HUMANA" do prompt

### 2. INTENSIDADE DA URGÊNCIA

**Atual:** Alta (HOJE, AGORA, últimas vagas)

**Para ajustar:**
```
Menos urgente:
- "Ainda temos algumas vagas disponíveis"
- "Quando você quiser começar, estamos aqui"

Mais urgente:
- "Só restam 3 vagas HOJE"
- "Acaba em 2 horas, literalmente"
```

**Onde ajustar:** Seção "GATILHOS MÁXIMOS" → ESCASSEZ e URGÊNCIA

### 3. ESTILO DE MENSAGENS

**Atual:** Curtas (2-4 linhas), múltiplas mensagens

**Para ajustar:**
- Mensagens ainda mais curtas (1-2 linhas)
- Mensagens um pouco mais longas (5-6 linhas)

**Onde ajustar:** Final do prompt, adicionar:
```
- Cada mensagem DEVE ter no máximo 2 linhas
```

### 4. MOMENTO DO FECHAMENTO

**Atual:** Acelera o fechamento, envia link rápido

**Para ajustar:**
```
Fechar mais rápido:
- "Envie o link já na 2ª ou 3ª mensagem"

Fechar mais devagar:
- "Construa rapport por pelo menos 5 mensagens antes de enviar link"
```

**Onde ajustar:** Seção "FECHAMENTO DIRETO"

### 5. TRATAMENTO DE OBJEÇÕES

**Atual:** Destrói objeções de forma direta e agressiva

**Para ajustar:**
```
Mais empático:
- "Adicionar mais validação antes de rebater"

Mais direto:
- "Não aceitar objeções, sempre redirecionar pro checkout"
```

**Onde ajustar:** Seção "OBJEÇÕES EM TEMPO REAL"

---

## 💡 EXEMPLOS DE AJUSTES

### Exemplo 1: Tornar mais profissional

**ANTES:**
```
Você é o VENDEDOR MAIS LENDÁRIO DO PLANETA.
```

**DEPOIS:**
```
Você é um consultor de vendas experiente e respeitado.
```

### Exemplo 2: Aumentar curiosidade

**ADICIONAR ao prompt:**
```
9.5 **TÉCNICA DO "BURACO ABERTO"**:
   - SEMPRE mencione algo que não vai revelar agora
   - "Tem um detalhe específico que não posso falar aqui..."
   - "Existe um passo secreto que está dentro do método..."
   - Isso aumenta MUITO a vontade de comprar
```

### Exemplo 3: Adicionar follow-up

**ADICIONAR ao prompt:**
```
11. **FOLLOW-UP AUTOMÁTICO**:
   - Se a pessoa sumir por 15 minutos, retomar com:
   - "E aí, ainda tá aí?"
   - "Tá pensando muito? Enquanto você pensa, outros já estão faturando"
```

### Exemplo 4: Personalização por nome

**ADICIONAR ao prompt:**
```
IMPORTANTE: Se souber o nome da pessoa (no histórico), use o nome dela pelo menos 1x por conversa.
Exemplo: "João, vou ser direto com você..."
```

---

## 📊 MÉTRICAS PARA AVALIAR MUDANÇAS

Antes de mudar, anote:
- Taxa de conversão atual
- Tempo médio de conversa até compra
- Principal objeção que aparece

Depois de mudar:
- Comparar taxa de conversão
- Ver se o tempo mudou
- Verificar se objeções diminuíram

**Fórmula conversão:**
```
Taxa = (Conversões / Total Conversas) × 100
```

Acompanhe no Supabase:
```sql
SELECT
  status,
  COUNT(*) as quantidade,
  ROUND(COUNT(*)::numeric / (SELECT COUNT(*) FROM conversations) * 100, 2) as percentual
FROM conversations
GROUP BY status;
```

---

## 🎯 ESTRATÉGIAS AVANÇADAS

### A/B Testing Manual

1. **Criar duas versões do prompt**
2. **Testar cada uma por 3-5 dias**
3. **Comparar métricas**
4. **Usar a melhor**

**Como fazer:**
- Salvar Prompt A no arquivo
- Rodar tráfego por 3 dias
- Salvar métricas
- Mudar para Prompt B
- Rodar tráfego por 3 dias
- Comparar resultados

### Ajuste por Objeção Recorrente

Se você perceber que MUITA gente fala a mesma objeção:

**Exemplo:** "Tenho medo de não conseguir"

**Adicionar no prompt:**
```
OBJEÇÃO COMUM #1: "Tenho medo de não conseguir"
→ "Cara, o método é tão simples que se você consegue usar WhatsApp, você consegue aplicar. Já tive gente de 60 anos sem saber NADA de tecnologia faturando em 2 dias. O problema não é se você consegue, é se você vai COMEÇAR ou não."
```

### Otimização por Público

Se seu público é diferente, ajuste:

**Público mais jovem (18-25):**
```
- Usar mais gírias
- Adicionar mais emojis
- Tom mais descontraído
- Mencionar "liberdade" e "independência"
```

**Público mais velho (40+):**
```
- Menos gírias
- Menos emojis
- Tom mais sério
- Mencionar "segurança" e "estabilidade"
```

---

## 🔥 TÉCNICAS DE COPYWRITING AVANÇADAS

### 1. PAS (Problem-Agitate-Solve)

**Adicionar:**
```
Identifique o problema → "Você tá cansado de depender de um salário fixo, né?"
Agite → "E o pior é que isso não vai mudar sozinho. Vai ser assim pro resto da vida."
Resolva → "Até você decidir aplicar um método como esse e mudar TUDO."
```

### 2. Técnica do "Sim Escalado"

**Adicionar:**
```
Faça perguntas que a pessoa só pode responder SIM:
- "Você quer ganhar mais dinheiro?" → SIM
- "Você tem celular?" → SIM
- "Você consegue separar 30 minutos por dia?" → SIM
- "Então você tem TUDO que precisa, certo?" → SIM
- "Bora garantir sua vaga?" → SIM (FECHAMENTO)
```

### 3. FOMO (Fear of Missing Out)

**Adicionar:**
```
Mencione constantemente o que a pessoa está PERDENDO:
- "Enquanto você pensa, alguém está comprando sua vaga"
- "Cada hora que você não tem o método, são R$100+ que você deixa na mesa"
- "Amanhã quando o preço subir, você vai se arrepender de não ter decidido hoje"
```

---

## 📝 TEMPLATE DE TESTE

Use este template para documentar seus testes:

```
Data: ___/___/___
Versão do Prompt: A / B
Mudança feita: ________________________________
Período de teste: ___/___/___ até ___/___/___

ANTES:
- Total conversas: ___
- Conversões: ___
- Taxa: ___%
- Tempo médio: ___ min

DEPOIS:
- Total conversas: ___
- Conversões: ___
- Taxa: ___%
- Tempo médio: ___ min

RESULTADO: Melhor / Pior / Igual
DECISÃO: Manter / Reverter / Testar mais
```

---

## ⚠️ CUIDADOS AO AJUSTAR

1. **Não mude tudo de uma vez** - Mude 1 coisa por vez
2. **Teste com volume** - Pelo menos 20-30 conversas antes de concluir
3. **Não remova o que funciona** - Se está vendendo, ajuste com cuidado
4. **Mantenha backup** - Salve a versão antiga antes de mudar
5. **Acompanhe métricas** - Não ajuste "no feeling", use dados

---

## 🎯 CHECKLIST DE OTIMIZAÇÃO

Antes de fazer qualquer mudança:

- [ ] Salvar versão atual do prompt
- [ ] Anotar métricas atuais (taxa de conversão)
- [ ] Definir O QUE vai mudar (1 coisa apenas)
- [ ] Definir QUANTO TEMPO vai testar (mínimo 3 dias)
- [ ] Fazer a mudança
- [ ] Fazer redeploy
- [ ] Testar com mensagem real
- [ ] Aguardar período de teste
- [ ] Comparar métricas
- [ ] Decidir: manter ou reverter

---

## 💡 DICA FINAL

**O prompt atual já está MUITO otimizado!**

Só ajuste se você realmente perceber que algo não está funcionando ou se conhece muito bem seu público e quer personalizar ainda mais.

Às vezes, menos mudança = mais resultado.

---

**Boa sorte com as otimizações! 🚀**
