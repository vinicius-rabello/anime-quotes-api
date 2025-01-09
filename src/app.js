// Importa as bibliotecas necessárias
const express = require('express');
const path = require('path');
const pool = require('../db/db');

// Define um objeto com as rotas referentes a tabela exercises da base postgres em que estamos conectados
const quoteRoutes = require("../routes/quoteRoutes");

// Cria uma instância do Express
const app = express();

// Middleware para interpretar o corpo das requisições no formato JSON
app.use(express.json());

// Middleware para servir arquivos estáticos da pasta 'public'
// Arquivos como HTML, CSS, imagens, etc., estarão disponíveis no cliente
app.use(express.static(path.join(__dirname, '../public')));

// Define o endpoint /exercises e conecta com as rotas presentes em routes/exerciseRoutes.js
app.use('/quotes', quoteRoutes);

// Define a rota raiz '/' que retorna o arquivo index.html localizado em 'public'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Define a porta em que o servidor será executado
const PORT = 3000;

// Inicia o servidor na porta especificada e exibe uma mensagem no console
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});