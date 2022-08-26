const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API TEST", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /users", () => {
    test("It should response with 200 success", async () => {
      const response = await request(app)
        .get("/api/v1/users")
        .expect(200)
        .expect("Content-Type", /json/);
      // expect(response.statusCode).toBe(200) //jest
    });
  });

  describe("Test POST /users", () => {
    test("It should response with 201 created on signup", async () => {
      const random = Math.floor(Math.random() * 1000);
      const response = await request(app)
        .post("/api/v1/users/signup")
        .send({
          name: "Rumman",
          email: `rumman${random}@gmail.com`,
          password: "123123123",
          passwordConfirm: 123123123,
        })
        .expect(201);
    });
    test("It should response with 200 success on login", () => {});
    test("It should catch weather user exist", () => {});
    test("It should catch missing required properties on login", () => {});
    test("It should catch invalid email and password error", () => {});
  });
});
