const request = require("supertest");
const app = require("../server");
const jwt = require("jsonwebtoken");
const UserService = require('../services/userService');

describe("GET /cliente/", () => {
    it("should responds error if user is not authenticated", async () => {
        const response = await request(app).get("/cliente/");
        expect(response.status).toBe(403);
        expect(response.body.message).toBe("usuário não autenticado");
    })
    it("should respond with data if user is authenticated", async () => {
        const token = jwt.sign({ usuario: 'usuario_teste' }, 'secretpassword', { expiresIn: '1h' });

        const response = await request(app)
            .get("/cliente/")
            .set('Authorization', `${token}` );

        expect(response.status).toBe(200);
    });
})

describe("POST /login", () => {
    it("should responds the token if user is authenticated", async () => {
        const response = await request(app).post("/login").send({ usuario: "gabriel", senha: "123456" });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    })
    it("should responds error if user is not found", async () => {
        jest.spyOn(UserService, 'getUser').mockImplementation((req) => null);
        const response = await request(app).post("/login").send({ usuario: "gabriel", senha: "123456" });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Credenciais inválidas.");
    })
})

describe("POST /logout", () => {
    it("should responds success message if logout occurs correctly", async () => {
        jest.spyOn(UserService, 'cleanToken').mockImplementation((req) => true);
        const response = await request(app).post("/logout").set('Authorization', `ABC` ).send();
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("logout feito com sucesso");
    })
    it("should responds error if logout occurs correctly", async () => {
        jest.spyOn(UserService, 'cleanToken').mockImplementation((req) => false);
        const response = await request(app).post("/logout").set('Authorization', `ABC` ).send();
        expect(response.status).toBe(500);
        expect(response.body.message).toBe("logout azedou");
    })
})