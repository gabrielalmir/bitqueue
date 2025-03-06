# Requisitos do MVP - BitQueue

O MVP (Minimum Viable Product) do BitQueue é uma versão inicial do serviço de filas HTTP voltada para usuários com baixa infraestrutura. O objetivo é oferecer funcionalidades essenciais para validar a ideia com usuários reais, mantendo simplicidade, eficiência e escalabilidade como prioridades. Abaixo estão os **requisitos funcionais** e **não-funcionais** para o backend em Go, integrando-se ao frontend em Next.js/TypeScript.

---

## Requisitos Funcionais (RF)

### RF1: Gerenciamento de Usuários (Simplificado)
- **RF1.1 - Cadastro e Login**
  - Permitir que usuários se cadastrem com email e senha.
  - Enviar email de confirmação para validar o endereço (usando AWS SES ou SendGrid).
  - Suportar login com email e senha (login social, como Google OAuth, pode ser adicionado depois).
  - Retornar um token JWT ou chave API após login para autenticação nas requisições.
- **RF1.2 - Gerenciamento de Perfil (Básico)**
  - Permitir que o usuário visualize sua chave API no perfil.
  - Excluir funcionalidades avançadas como edição de perfil ou redefinição de senha (pode ser adicionado em iterações futuras).
- **RF1.3 - Gerenciamento de Planos (Simplificado)**
  - Suportar apenas um plano Freemium no MVP:
    - Limite de 5 filas por usuário.
    - Limite de 10.000 mensagens por mês.
  - Rastrear uso básico (número de filas e mensagens usadas) e retornar essas informações ao frontend.

### RF2: Gerenciamento de Filas (Essencial)
- **RF2.1 - Criação de Filas**
  - Permitir criar uma nova fila com:
    - Nome (letras minúsculas, números, hífen, único por usuário).
    - Default Visibility Timeout (fixo em 30s no MVP).
    - Message Retention Period (fixo em 7 dias no MVP).
    - Delivery Delay (fixo em 0s no MVP).
  - Validação: Verificar duplicidade de nomes e limite de filas (5 por usuário).
  - Excluir campos como descrição e tipo de fila (Standard será o único tipo no MVP).
- **RF2.2 - Listagem de Filas**
  - Retornar a lista de filas do usuário com:
    - Nome, status (active/paused), número de mensagens, data de criação.
    - Excluir taxa de processamento no MVP (pode ser adicionado depois).
- **RF2.3 - Visualização de Detalhes da Fila**
  - Fornecer detalhes básicos de uma fila:
    - Total de mensagens (pendentes, processadas, falhas).
    - Excluir métricas avançadas como taxa de processamento e latência média.
- **RF2.4 - Exclusão de Fila**
  - Permitir excluir uma fila e suas mensagens associadas.
  - Excluir ações como pausar/reiniciar ou purgar mensagens (pode ser adicionado depois).

### RF3: Gerenciamento de Mensagens (Básico)
- **RF3.1 - Enfileiramento de Mensagens**
  - Permitir enfileirar mensagens em formato JSON (ex.: `{ "orderId": "12345", "customer": "John Doe", "amount": "99.90" }`).
  - Aplicar `visibility_timeout` fixo (30s) e ignorar `delivery_delay` (0s).
- **RF3.2 - Desenfileiramento de Mensagens**
  - Permitir desenfileirar a próxima mensagem pendente, marcando-a como invisível por 30s.
  - Excluir suporte a "peek" no MVP.
- **RF3.3 - Monitoramento de Mensagens**
  - Rastrear o status das mensagens (pendente, processada, falha).
  - Excluir limpeza automática de mensagens expiradas no MVP (pode ser feita manualmente ou implementada depois).

### RF4: Métricas e Relatórios (Simplificado)
- **RF4.1 - Métricas Gerais**
  - Retornar métricas básicas:
    - Total de filas.
    - Total de mensagens processadas.
    - Excluir latência média, taxa de sucesso e comparações históricas.
- **RF4.2 - Uso do Plano**
  - Retornar uso atual (mensagens usadas/limite, filas usadas/limite).

### RF5: Integrações e Suporte (Mínimo)
- **RF5.1 - API RESTful**
  - Fornecer endpoints básicos para integração com o frontend:
    - `POST /queues` (criar fila).
    - `GET /queues` (listar filas).
    - `GET /queues/{queue_id}` (detalhes da fila).
    - `DELETE /queues/{queue_id}` (excluir fila).
    - `POST /queues/{queue_id}/messages` (enfileirar mensagem).
    - `GET /queues/{queue_id}/messages` (desenfileirar mensagem).
    - `GET /metrics` (métricas gerais).
    - `GET /usage` (uso do plano).
- **RF5.2 - Segurança**
  - Exigir token JWT ou chave API em todas as requisições.
  - Usar HTTPS para todas as comunicações.
  - Excluir criptografia no repouso (pode ser adicionada depois).
- **RF5.3 - Colaboração em Equipe**
  - Excluir suporte a múltiplos usuários por conta no MVP (cada usuário gerencia sua própria conta).

---

## Requisitos Não-Funcionais (RNF)

### RNF1: Performance
- **RNF1.1 - Latência Baixa**
  - Latência média para enfileirar/desenfileirar mensagens deve ser inferior a 100ms (relaxado do requisito original de 50ms para simplificar o MVP).
- **RNF1.2 - Taxa de Processamento**
  - Suportar pelo menos 100 mensagens por minuto por fila em um único servidor.
- **RNF1.3 - Tempo de Resposta da API**
  - Endpoints devem responder em menos de 300ms em 95% das requisições (relaxado de 200ms para o MVP).

### RNF2: Escalabilidade
- **RNF2.1 - Escalabilidade Horizontal**
  - Deve ser projetado para suportar escalabilidade futura via AWS ECS/Fargate, mas no MVP pode rodar em um único servidor.
- **RNF2.2 - Capacidade Máxima**
  - Suportar até 10.000 mensagens por mês por usuário (limite do plano Freemium).

### RNF3: Segurança
- **RNF3.1 - Autenticação e Autorização**
  - Todas as requisições devem exigir um token JWT ou chave API válida.
  - Suporte básico a logout (invalidação de token no frontend).
- **RNF3.2 - Criptografia**
  - Usar HTTPS para todas as comunicações.
  - Excluir criptografia no repouso para o MVP.
- **RNF3.3 - Conformidade**
  - Incluir uma política de privacidade básica para conformidade com GDPR (ex.: opção de excluir conta manualmente via suporte).

### RNF4: Confiabilidade
- **RNF4.1 - Disponibilidade**
  - Atingir 99% de uptime no MVP (relaxado de 99.9% para simplificar).
  - Usar AWS RDS para PostgreSQL, mas sem réplicas no MVP.
- **RNF4.2 - Tolerância a Falhas**
  - Garantir que falhas no servidor não resultem em perda de dados (usar PostgreSQL transacional).
- **RNF4.3 - Backup**
  - Excluir backups automáticos no MVP (pode ser configurado manualmente ou adicionado depois).

### RNF5: Usabilidade
- **RNF5.1 - Simplicidade da API**
  - Endpoints devem ser intuitivos e bem documentados (ex.: documentação básica em Markdown ou Swagger).
- **RNF5.2 - Suporte a Clientes Leigos**
  - Fornecer exemplos de código simples (ex.: cURL) para cada endpoint.

### RNF6: Manutenibilidade
- **RNF6.1 - Código Modular**
  - Seguir a estrutura modular sugerida (`internal/api`, `internal/queue`, `internal/storage`).
- **RNF6.2 - Testes**
  - Cobrir pelo menos 50% do código com testes unitários no MVP (relaxado de 80%).
- **RNF6.3 - Logging**
  - Registrar erros e eventos principais (ex.: criação de fila) em formato simples (ex.: logs de texto).

### RNF7: Escalabilidade de Infraestrutura
- **RNF7.1 - Containerização**
  - Ser compatível com Docker para deploy futuro, mas o MVP pode rodar localmente ou em uma instância EC2 simples.
- **RNF7.2 - Monitoramento**
  - Excluir integração com Prometheus/Grafana no MVP (usar logs simples para monitoramento inicial).
- **RNF7.3 - CI/CD**
  - Excluir pipelines automáticos no MVP (deploy manual via AWS).

### RNF8: Internacionalização (Excluído do MVP)
- O suporte a múltiplos idiomas será adicionado em iterações futuras.

---

## Considerações Finais
O MVP do BitQueue foca em funcionalidades essenciais (cadastro, criação/listagem/exclusão de filas, gerenciamento básico de mensagens e métricas simples), mantendo o backend em Go leve e eficiente. Os requisitos não-funcionais são ajustados para um escopo inicial, priorizando performance aceitável, segurança básica e manutenção simplificada. Após o lançamento, o feedback dos usuários pode guiar iterações para adicionar funcionalidades como métricas avançadas, colaboração em equipe e escalabilidade completa.
