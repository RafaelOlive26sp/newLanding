# newLanding

Sistema web para gestão de alunos, agendamento de aulas e controle de pagamentos, desenvolvido com Vue 3, Vuetify 3, Pinia e Vite. O objetivo é proporcionar uma experiência moderna e intuitiva para academias ou para personais Trainer, permitindo que alunos gerenciem seus dados, agendamentos e pagamentos de forma simples e eficiente.

## 🚀 Funcionalidades

- **Cadastro e Login de Usuários:** Permite que novos alunos se cadastrem e façam login de forma segura.
- **Completar Perfil:** Alunos podem preencher informações complementares de saúde e histórico de atividades.
- **Agendamento de Aulas:** Visualização dos agendamentos do aluno, com detalhes de turma, horário e nível.
- **Controle de Pagamentos:** Consulta de pagamentos pendentes, geração de pagamentos fictícios e histórico.
- **Feedback Visual:** Sistema de notificações (snackbar) para informar sucesso ou erros nas operações.
- **Layout Responsivo:** Interface adaptada para dispositivos móveis e desktop.
- **Logout Seguro:** Encerramento de sessão com remoção de dados sensíveis.

## 🛠️ Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) — Framework e bundler modernos para aplicações web.
- [Vuetify 3](https://vuetifyjs.com/) — Biblioteca de componentes UI baseada em Material Design.
- [Pinia](https://pinia.vuejs.org/) — Gerenciamento de estado global.
- [Vue Router](https://router.vuejs.org/) — Roteamento SPA.
- [Axios](https://axios-http.com/) — Requisições HTTP.
- [Express](https://expressjs.com/) — Servidor Node.js para produção.
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) — Importação automática de componentes.
- [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) — Geração automática de rotas a partir de arquivos Vue.
- [Pusher](https://pusher.com/) — Plataforma para broadcasts em tempo real via WebSocket.
- [Pusher-js](https://github.com/pusher/pusher-js) — Biblioteca cliente para WebSocket.

## Sistema de Notificações em Tempo Real 🔔
*Implementado em 14 de Junho de 2025* 🆕


A aplicação utiliza WebSocket através do Laravel Echo e **Pusher** para proporcionar comunicação em tempo real entre o servidor e os clientes. Este sistema garante que os usuários recebam atualizações instantâneas, sem necessidade de atualizar a página.

### Funcionalidades Atuais:
- 🔄 Notificação instantânea quando um aluno é movido para outra turma
- 📝 Acompanhamento em tempo real de alterações nas turmas

### Próximas Implementações:
- 💰 Notificações de pagamentos e faturas
- ⚠️ Alertas de cancelamento de aulas
- 📅 Avisos sobre alterações no cronograma
- 📬 Sistema de mensagens instantâneas

### Como Funciona
O sistema utiliza WebSocket para manter uma conexão persistente entre o servidor e o cliente, permitindo que informações sejam enviadas instantaneamente para os usuários conectados. Isso resulta em:
- Menor latência na entrega de notificações
- Redução da carga no servidor
- Melhor experiência do usuário
- Comunicação bidirecional em tempo real


## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/newLanding.git
cd newLanding
npm install
```
## Configuração do Ambiente

1. Clone o repositório
2. Copie o arquivo de exemplo de ambiente:
   ```bash
   cp .env.example .env.development
   ```
3. Edite o arquivo `.env.development` com suas configurações locais

### Configurando o Pusher

Para que a comunicação em tempo real funcione, você precisa configurar as credenciais do Pusher.

1.  **Obtenha suas credenciais:**
   *   Acesse sua conta no [Pusher.com](https://pusher.com/).
   *   Crie um novo aplicativo do tipo "Channels".
   *   Na aba "App Keys" do seu aplicativo, você encontrará as credenciais necessárias.

2.  **Configure o arquivo `.env.development`:**
   *   Abra o arquivo `.env.development` na raiz do seu projeto.
   *   Adicione ou altere as seguintes variáveis com as credenciais que você obteve:

    ```env
    VITE_PUSHER_APP_KEY="SUA_APP_KEY_DO_PUSHER"
    VITE_PUSHER_APP_CLUSTER="SEU_CLUSTER_DO_PUSHER"
    VITE_BROADCASTER=pusher
    ```

**Importante:** Os valores de `VITE_PUSHER_APP_KEY` e `VITE_PUSHER_APP_CLUSTER` **devem ser idênticos** aos valores configurados no arquivo `.env` do seu projeto da API (backend) para que a comunicação funcione. A chave `APP_SECRET` do Pusher deve permanecer apenas no backend e nunca ser exposta no código do frontend.


## 💻 Desenvolvimento

Para rodar o projeto em modo de desenvolvimento:


```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 🏗️ Build para Produção

Para gerar os arquivos otimizados para produção:

```bash
npm run build
```

Para servir a aplicação em produção (após o build):

```bash
npm start
```

## 📂 Estrutura de Pastas

- `src/components/` — Componentes Vue reutilizáveis (login, cadastro, layouts, etc).
- `src/pages/` — Páginas que viram rotas automaticamente.
- `src/services/` — Serviços para comunicação com a API (autenticação, usuários, pagamentos).
- `src/stores/` — Stores Pinia para gerenciamento de estado.
- `src/layouts/` — Layouts globais para as páginas.
- `src/plugins/` — Plugins globais (Vuetify, Pinia, Router).
- `public/` — Arquivos estáticos.

## 🔒 Autenticação

- Utiliza JWT armazenado em cookies e localStorage.
- Rotas protegidas para usuários autenticados.
- Logout remove tokens e redireciona para a tela inicial.

## 📑 Licença

[MIT](http://opensource.org/licenses/MIT)

---

Desenvolvido por [Rafael de Oliveira](https://github.com/RafaelOlive26sp/newLanding)