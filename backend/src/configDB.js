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
            console.log("TABLE CREATED WITH SUCCESS")
        }
    }
)

//Get all the data 
const getAll = (callback) => {
    db.all("SELECT id, username, cep, logradouro, numero, bairro, estado FROM users", (err, rows) => {
        if(err){
            console.log(err)
        } else {
            callback(rows)
        }
    })
}

const newUser = db.prepare(
    `INSERT INTO users (username, password, cep, logradouro, numero, bairro, estado)
    VALUES (?, ?, ?, ?, ?, ?,?)`,
    (err) => {
        if(err){
            console.error(err);
        } else {
            console.log("The user was created")
        }
    }
)

const deleteUser = db.prepare(
    `DELETE FROM users WHERE id === ?`,
    (err)=>{
        if(err){
            console.error(err)
        } else {
            console.log("The user was deleted")
        }
    }
)

const editUser = db.prepare(
    ` UPDATE users
        SET username = ?,
        SET password = ?,
        SET cep = ?,
        SET logradouro = ?,
        SET numero = ?,
        SET bairro = ?,
        SET estado = ?,
    `,
    (err) => {
        if(err){
            console.error(err)
        } else {
            console.log("User was updated")
        }
    }
)

const server = http.createServer((req, res) => {
    //Avoid CORS error
    res.setHeader("Access-Control-Allow-Origin",  "*");
    res.setHeader("Access-Control-Allow-Methods",  "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers",  "Content-Type");

    //Return the info to the server
    search((result) => {
        res.write(JSON.stringify(result));
        res.end();
    })

    //Check req types
    if(req.method === "POST"){
        let body = "";

        //Get the info from server
        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", () => {
            //Deserialize the info
            const parsedBody = JSON.parse(body)
            console.log(parsedBody)
            
            newUser.run(
                parsedBody.username,
                parsedBody.password,
                parsedBody.cep,
                parsedBody.logradouro,
                parsedBody.numero,
                parsedBody.bairro,
                parsedBody.estado
            )
            console.log("User successfully created")
        })
    } else if(req.method === "DELETE"){
        let body = "";

        //Get the info from server
        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", () => {
            //Deserialize the info
            const parsedBody = JSON.parse(body)
            console.log(parsedBody)

            deleteUser.run(parsedBody.id)
            console.log("User successfully deleted")
        })
    } else if(req.method === "PUT"){
        let body = "";

        //Get the info from server
        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", () => {
            //Deserialize the info
            const parsedBody = JSON.parse(body)
            console.log(parsedBody)
            
            editUser.run(
                parsedBody.username,
                parsedBody.password,
                parsedBody.cep,
                parsedBody.logradouro,
                parsedBody.numero,
                parsedBody.bairro,
                parsedBody.estado
            )
            console.log("User successfully edited")
        })
    }
})

const port = 3000
server.listen(port)
console.log("It's on baby")
