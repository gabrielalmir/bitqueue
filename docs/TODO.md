# Requisitos Pendentes para o BitQueue

O projeto BitQueue, um sistema de filas de mensagens em desenvolvimento com backend (Bun, Fastify, Prisma) e frontend (React), ainda possui uma série de requisitos funcionais e não funcionais a serem implementados. Abaixo está uma lista baseada no contexto atual e nas práticas comuns para sistemas como este.

## Requisitos Funcionais Pendentes

- **Gerenciamento de Usuários Avançado**
  - Autenticação com Refresh Tokens: Adicionar suporte a refresh tokens para sessões seguras e longas.
  - Planos de Usuário (Freemium/Pro): Implementar lógica para limitar 10.000 mensagens/mês no Freemium e oferecer mais no plano Pro.
  - Recuperação de Senha: Criar funcionalidade para redefinir senha via e-mail ou outro método.

- **Funcionalidades de Filas**
  - Deleção de Filas: Adicionar endpoint para deletar filas, útil para limpeza ou gerenciamento.
  - Reenfileiramento de Mensagens: Permitir reprocessar mensagens com falha (status 'failed') ou reenfileirá-las manualmente.
  - Prioridade de Mensagens: Suporte a mensagens prioritárias para filas específicas.

- **Métricas e Relatórios**
  - Histórico de Métricas: Armazenar e exibir métricas históricas (ex.: mensagens processadas por dia/semana).
  - Notificações de Limites: Alertar usuários quando estiverem próximos do limite de mensagens (ex.: 10.000/mês no Freemium).

- **Frontend Avançado**
  - Visualização de Filas: Interface para listar filas, exibir mensagens pendentes/processadas e suas métricas.
  - Gestão de Mensagens: Funcionalidade para enviar mensagens ou reprocessá-las diretamente pelo frontend.
  - Dashboard de Usuário: Mostrar informações do plano, uso de mensagens e métricas em uma interface amigável.

- **Integração e API**
  - Webhooks: Permitir que usuários configurem webhooks para receber notificações de eventos (ex.: mensagem processada).
  - Documentação da API: Criar documentação (ex.: Swagger/OpenAPI) para facilitar o uso da API por terceiros.

## Requisitos Não Funcionais Pendentes

- **Escalabilidade e Performance**
  - Migração para Banco Escalável: Substituir SQLite por PostgreSQL ou Redis para suportar mais usuários e mensagens.
  - Testes de Carga: Garantir 100 mensagens/min por fila com múltiplos usuários simultâneos.
  - Cache de Métricas: Implementar cache (ex.: Redis ou `Map`) para reduzir latência em métricas frequentes.

- **Confiabilidade e Resiliência**
  - Retry Mechanism: Adicionar retries automáticos para mensagens que falham no processamento.
  - Dead Letter Queue (DLQ): Criar fila para mensagens que falham após várias tentativas, evitando bloqueios.
  - Backup e Recuperação: Implementar backup periódico do banco para evitar perda de dados.

- **Observabilidade**
  - Tracing Distribuído: Adicionar tracing (ex.: OpenTelemetry) para monitorar o fluxo de mensagens.
  - Alertas: Configurar alertas para falhas ou latências altas (ex.: com Prometheus/Grafana).
  - Logs Estruturados: Estruturar logs em JSON para facilitar análise (ex.: com `pino` no Fastify).

- **Segurança**
  - Rate Limiting: Proteger a API contra abusos com rate limiting por usuário.
  - Validação de Entrada no Frontend: Reforçar validação no frontend para evitar requisições inválidas.
  - Segurança de Senhas: Garantir que `Bun.password` (bcrypt) use um custo alto o suficiente.

- **Testes e Qualidade**
  - Testes Unitários e de Integração: Cobrir mais casos nos usecases e na integração com o banco.
  - Testes End-to-End (E2E): Criar testes para fluxos completos (ex.: criar fila, enviar mensagem, consumir).
  - Testes no Frontend: Implementar testes unitários e de integração para componentes React.

- **Manutenibilidade e Documentação**
  - CI/CD: Configurar pipelines (ex.: GitHub Actions) para testes e deploy automáticos.
  - Documentação do Código: Adicionar comentários e documentação detalhada.
  - README e Wiki: Atualizar o README com instruções e criar uma wiki no GitHub.

## Considerações

- **Escopo do MVP**: Priorizar gerenciamento de usuários (refresh tokens, planos), métricas históricas e uma interface frontend funcional para atender às necessidades básicas.
- **Longo Prazo**: Focar na migração para um banco escalável e observabilidade avançada (tracing, alertas) para suportar mais usuários e mensagens.

Se houver mais detalhes sobre o progresso atual, a lista pode ser refinada!
