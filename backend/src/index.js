const express = require('express');
const cors = require("cors")
const db = require('./configDB')
const app = express();
app.use(cors())
app.use(express.json())
const port = 3001;
const jwt = require('jsonwebtoken');

function VerifyJWT(req, res, next) {
  const token = req.headers['x-acess-token']
  jwt.verify(token, 'Teste', (err, decoded) => {
      if (err) return res.status(401).end()
      db.execute('SELECT id FROM session WHERE token = ?', [token],
          function(err, data) {
              if (data != null) {
                  if(data.length > 0) {
                    req.userId = decoded.id
                    req.username = decoded.username
                    next()
                  } else {
                    return res.status(401).end()
                  }
                  
              } else {
                  return res.status(401).end()
              }
          })
  })
}

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.login(username,password,
    function(err, data) {
      if (err) res.json(err.sqlMessage)
        if (data == 'Erro') res.status(400).json({ message: 'Usuário ou Senha incorretos.' });
        else {
            const token = jwt.sign({ id: data[0].id, username: data[0].username }, "Teste", {
                expiresIn: '12h'
            });
            db.execute('DELETE FROM session WHERE id =? ;', [data[0].id], function (err, result) {})
            db.execute('INSERT INTO session (token, id) VALUES (?,?);', [token, data[0].id], function (err, result) {})
            res.json({ auth: true, token: token, username: data[0].username })
        }
    }
  )
});

app.post('/AddUser', VerifyJWT, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const cep = req.body.cep;
  const logradouro = req.body.logradouro;
  const numero = req.body.numero;
  const bairro = req.body.bairro;
  const estado = req.body.estado;

  db.execute(`INSERT INTO users (username, password, cep, logradouro, numero, bairro, estado)
  VALUES (?, ?, ?, ?, ?, ?,?)`, [username, password, cep, logradouro, numero, bairro, estado],
  function(err, data) {
      if (err) res.json(err.sqlMessage)
      else res.json(data)
  })
});

app.get('/users', VerifyJWT, (req, res) => {
  db.execute("SELECT id, username, cep, logradouro, numero, bairro, estado FROM users",[],
  function(err, data) {
      if (err) res.json(err.sqlMessage)
      else res.json(data)
  })
});

app.delete('/users/:id', VerifyJWT, (req, res) => {
  db.execute("DELETE FROM users WHERE id = ?;",[req.params.id],
  function(err, data) {
      if (err) res.json(err.sqlMessage)
      else res.json(data)
  })
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = {
    app
}
