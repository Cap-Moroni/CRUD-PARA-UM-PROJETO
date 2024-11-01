const express = require('express');
const db = require('./database');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/products', (req, res) => {
    // Extrai 'name' e 'price' do corpo da requisição.
    const { name, price } = req.body;

    // Executa uma consulta SQL para inserir um novo produto na tabela 'product':
    // O ID é gerado automaticamente pelo banco de dados (não incluído na inserção).
    db.run('INSERT INTO product (name, price) VALUES (?, ?)', [name, price], function(err) {
        if (err) {
            // Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem de erro.
            return res.status(400).json({ error: err.message });
        }

        // Envia uma resposta com status 201 (Criado) e o ID do novo produto.
        res.status(201).json({ id: this.lastID });
    });
});

app.get('/products', (req, res) => {
    // Executa uma consulta SQL para selecionar todos os produtos da tabela 'product'.
    db.all('SELECT * FROM product', [], (err, rows) => {
        if (err) {
            // Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem de erro.
            return res.status(400).json({ error: err.message });
        }

        // Envia a resposta com os produtos obtidos como JSON.
        res.json(rows);
    });
});

app.put('/products/:id', (req, res) => {
    // Extrai o ID dos parâmetros da requisição.
    const { id } = req.params;

    // Extrai 'name' e 'price' do corpo da requisição.
    const { name, price } = req.body;

    // Executa uma consulta SQL para atualizar o produto com o ID fornecido.
    // O ID não é alterado; apenas 'name' e 'price' são atualizados.
    db.run('UPDATE product SET name = ?, price = ? WHERE id = ?', [name, price, id], function(err) {
        if (err) {
            // Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem de erro.
            return res.status(400).json({ error: err.message });
        }

        // Envia a resposta com a quantidade de registros atualizados.
        res.json({ updated: this.changes });
    });
});

app.delete('/products/:id', (req, res) => {
    // Extrai o ID dos parâmetros da requisição.
    const { id } = req.params;

    // Executa uma consulta SQL para deletar o produto com o ID fornecido.
    db.run('DELETE FROM product WHERE id = ?', [id], function(err) {
        if (err) {
            // Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem de erro.
            return res.status(400).json({ error: err.message });
        }

        // Envia a resposta com a quantidade de registros deletados.
        res.json({ deleted: this.changes });
    });
});




app.post('/user', (req, res) => {
    // Extrai 'name' e 'price' do corpo da requisição.
    const { login, senha } = req.body;

    // Executa uma consulta SQL para inserir um novo produto na tabela 'product':
    // O ID é gerado automaticamente pelo banco de dados (não incluído na inserção).
    db.run('INSERT INTO user (login, senha) VALUES (?, ?)', [login, senha], function(err) {
        if (err) {
            // Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem de erro.
            return res.status(400).json({ error: err.message });
        }

        // Envia uma resposta com status 201 (Criado) e o ID do novo produto.
        res.status(201).json({ id: this.lastID });
    });
});

app.get('/user', (req, res) => {
    // Executa uma consulta SQL para selecionar todos os produtos da tabela 'product'.
    db.all('SELECT * FROM user', [], (err, rows) => {
        if (err) {
            // Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem de erro.
            return res.status(400).json({ error: err.message });
        }

        // Envia a resposta com os produtos obtidos como JSON.
        res.json(rows);
    });
});

app.put('/user/:id', (req, res) => {
    // Extrai o ID dos parâmetros da requisição.
    const { id } = req.params;

    // Extrai 'name' e 'price' do corpo da requisição.
    const { login, senha } = req.body;

    // Executa uma consulta SQL para atualizar o produto com o ID fornecido.
    // O ID não é alterado; apenas 'name' e 'price' são atualizados.
    db.run('UPDATE user SET login = ?, senha = ? WHERE id = ?', [login, senha, id], function(err) {
        if (err) {
            // Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem de erro.
            return res.status(400).json({ error: err.message });
        }

        // Envia a resposta com a quantidade de registros atualizados.
        res.json({ updated: this.changes });
    });
});

app.delete('/user/:id', (req, res) => {
    // Extrai o ID dos parâmetros da requisição.
    const { id } = req.params;

    // Executa uma consulta SQL para deletar o produto com o ID fornecido.
    db.run('DELETE FROM user WHERE id = ?', [id], function(err) {
        if (err) {
            // Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem de erro.
            return res.status(400).json({ error: err.message });
        }

        // Envia a resposta com a quantidade de registros deletados.
        res.json({ deleted: this.changes });
    });
});












// Inicia o servidor e faz com que ele escute na porta especificada.
app.listen(port, () => {
    // Exibe uma mensagem no console quando o servidor está em execução.
    console.log(`Servidor rodando em http://localhost:${port}`);
});