import dotenv from 'dotenv';
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from "http";

dotenv.config();

const LOCAL_DEV = process.env.NODE_ENV !== 'production';

const app = express();
const HTTP_PORT = process.env.PORT || 3002;
const WS_PORT = 3001;

const allowedOrigins = [
  'http://localhost:5173',
  'https://desafio-tecnico-furia-front.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

/* Configurações OpenRouter gerada com IA */

const OPENROUTER_CONFIG = {
  API_URL: "https://openrouter.ai/api/v1/chat/completions",
  MODEL: "mistralai/mistral-7b-instruct", 
  HEADERS: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || 'free'}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:5173',
    'X-Title': 'FURIA Fan Chat'
  }
};

/* Rota POST para o caso do usuario perguntar algo a IA */

app.post("/api/perguntar-ia", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question?.trim()) {
      return res.status(400).json({ error: "Pergunta inválida" });
    }

    const response = await fetch(OPENROUTER_CONFIG.API_URL, {
      method: "POST",
      headers: OPENROUTER_CONFIG.HEADERS,
      body: JSON.stringify({
        model: OPENROUTER_CONFIG.MODEL,
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em CS2 e na equipe FURIA. Responda de forma concisa e empolgada!'
          },
          { role: 'user', content: question.trim() }
        ],
        temperature: 0.7,
        max_tokens: 256
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter error: ${error}`);
    }

    const data = await response.json();
    const resposta = data.choices[0]?.message?.content || "Não consegui gerar uma resposta.";

    res.json({ answer: resposta });

  } catch (error) {
    console.error("Erro na API:", {
      message: error.message,
      stack: error.stack.split('\n')[0]
    });
    
    res.status(500).json({ 
      error: "Desculpe, estou tendo problemas técnicos. Tente novamente mais tarde!",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/* WebSocket para interação no chat */

const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on("connection", (ws) => {
  ws.on("message", (mensagem) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(mensagem.toString());
      }
    });
  });
});

server.listen(HTTP_PORT, () => {
  console.log(`Servidor unificado (HTTP+WS) na porta ${HTTP_PORT}`);
});