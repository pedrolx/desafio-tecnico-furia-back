# FURIA Fã Chat - Desafio Técnico - FURIA Tech 

Landing page interativa com **chat ao vivo entre fãs da FURIA** e um chatbot IA que responde perguntas sobre o time e CS2.
Este é o repositório do backend.

Repositório Frontend:
```bash
https://github.com/pedrolx/desafio-tecnico-furia-front
```

## 🚀 Como Rodar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências

#### Backend

```bash
npm install
```

#### Frontend

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` dentro da pasta `backend` com o seguinte conteúdo:

```env
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NODE_ENV=development
PORT=3002
WS_PORT=3001
```

### 4. Execute o projeto

#### Inicie o backend

```bash
npm start
```

Backend disponível em: [http://localhost:3002](http://localhost:3002)

#### Inicie o frontend

```bash
npm run dev
```

Frontend disponível em: [http://localhost:5173](http://localhost:5173)

## 🌐 Deploy

O projeto foi hospedado com:

- **Frontend:** [Vercel](https://vercel.com)
- **Backend:** [Render](https://render.com)

## ✅ Funcionalidades

- 🤖 IA que responde perguntas sobre a FURIA e CS2.
- 💬 Bate-papo em tempo real via WebSocket.
- 🚀 Deploy gratuito com Vercel e Render.
- 📱 Design responsivo.

## 🛠️ Tecnologias Usadas

### Frontend

- React 19
- Vite
- WebSocket

### Backend

- Node.js + Express
- WebSocket (`ws`)
- OpenRouter API (IA)
- dotenv, cors

## Info

Este projeto é um exercício técnico, sinta-se à vontade para clonar e adaptar.
