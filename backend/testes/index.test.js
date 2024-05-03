const request = require("supertest");
const app = require("../src/index.js");

let authToken = "";

describe("POST /login", () => {
    it("should respond with 200 OK and a success message on successful login", (done) => {
        request(app.app)
            .post("/login")
            .send({ username: "Daniel", password: "1234" })
            .expect(200)
            .expect((res) => {
                // Armazene o token recebido na variável authToken
                authToken = res.body.token;
            })
            .end(done);
    });

    it("should respond with 400 ERROR and a error message of user or password is invalid", (done) => {
        request(app.app)
            .post("/login")
            .send({ username: "Pannain", password: "asd123" })
            .expect(400)
            .end(done);
    });
});

describe("GET /users (without auth token)", () => {
    it("responds with JSON", (done) => {
        request(app.app).get("/users").expect(401, done);
    });
});

describe("GET /users (with auth token)", () => {
    it("responds with JSON", (done) => {
        request(app.app)
            .get("/users")
            .set("x-acess-token", `${authToken}`)
            .expect(200, done);
    });
});

describe("GET /users (with invalid auth token)", () => {
    it("responds with JSON", (done) => {
        request(app.app)
            .get("/users")
            .set("x-acess-token", `${authToken}123`)
            .expect(401, done);
    });
});
