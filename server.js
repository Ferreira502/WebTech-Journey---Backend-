const express = require('express');
const path = require('path');
const fs = require('fs');  // <-- importar o módulo fs
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contato.html'));
});

app.post('/sugestao', (req, res) => {
  const { nome, lanche, descricao } = req.body;
  console.log(`Sugestão recebida: ${nome} sugeriu o lanche "${lanche}" com descrição: ${descricao}`);

  // Caminho do arquivo JSON
  const arquivo = path.join(__dirname, 'sugestoes.json');

  // Ler as sugestões atuais do arquivo (ou criar array vazio se não existir)
  let sugestoes = [];
  if (fs.existsSync(arquivo)) {
    const dados = fs.readFileSync(arquivo, 'utf-8');
    if (dados) {
      sugestoes = JSON.parse(dados);
    }
  }

  // Adicionar nova sugestão
  sugestoes.push({ nome, lanche, descricao, data: new Date().toISOString() });

  // Salvar de volta no arquivo JSON
  fs.writeFileSync(arquivo, JSON.stringify(sugestoes, null, 2), 'utf-8');

  res.send(`<h1>Obrigado, ${nome}!</h1><p>Recebemos sua sugestão: ${lanche} 🍔</p>`);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});