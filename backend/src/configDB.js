const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database("database.db", (err)=>{
    if(err){
        console.log(err)
    } else {
        console.log("Connected")
    }
});


//Create a table if it isn't already exist
db.run(
    `CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        cep TEXT,
        logradouro TEXT,
        numero INTEGER,
        bairro TEXT,
        estado TEXT 
    )`,
    (err) => {  
        if(err){
            console.log(err)
        } else {
            console.log("TABLE USERS CREATED WITH SUCCESS")
        }
    }
)

db.run(
    `CREATE TABLE IF NOT EXISTS session(
        id INTEGER PRIMARY KEY,
        token TEXT
    )`,
    (err) => {  
        if(err){
            console.log(err)
        } else {
            console.log("TABLE SESSION CREATED WITH SUCCESS")
        }
    }
)


async function execute (query, params = null, callback) {
    const res = db.all(query, params, function(err, result) {
        console.log(callback)
        if (err) callback(err, null);
        callback(null, result);
    })

    return res
}

async function login(username, password, callback) {
    const res = db.all('SELECT id, password, username FROM users WHERE username = ?;', [username], function(err, result) {
        if (err) callback(err, null);
        if (result.length >= 1) {
            if (result[0].password === password) {
                callback(null, result);
            } else {
                callback(null, "Erro");
            }
        } else callback(null, "Erro");
    })
    return res
}

module.exports = { execute, login }
