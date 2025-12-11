/*
  # Sistema de Conversas WhatsApp - Método 108/dia

  1. Nova Tabela: conversations
    - `id` (uuid, chave primária)
    - `phone_number` (text, número do WhatsApp do lead)
    - `name` (text, nome do contato se disponível)
    - `messages` (jsonb, array com histórico completo de mensagens)
    - `last_message_at` (timestamptz, timestamp da última mensagem)
    - `status` (text, status: 'active', 'converted', 'cold')
    - `created_at` (timestamptz, data de criação)
    - `updated_at` (timestamptz, última atualização)

  2. Índices
    - Índice no phone_number para busca rápida
    - Índice no status para filtrar conversas ativas

  3. Segurança
    - RLS habilitado (sistema interno, sem policies públicas)
*/

CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL UNIQUE,
  name text DEFAULT '',
  messages jsonb DEFAULT '[]'::jsonb,
  last_message_at timestamptz DEFAULT now(),
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_conversations_phone ON conversations(phone_number);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message ON conversations(last_message_at DESC);

-- Habilitar RLS (sistema interno, sem acesso público)
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;