import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server";

const { expect } = chai;
chai.use(chaiHttp);
const url = "/api/v1/user";
describe("User authenticatation process", () => {
  describe("Register a user succesfully", async () => {
    it("should return a validation error", async () => {
      const res = await chai
        .request(server)
        .post(`${url}/register`)
        .send({
          name: "xa",
          email: "xavier4.com",
          password: "12"
        });
      expect(res).to.have.status(400);
      // expect(res.body).to.have.property("status");
      //   expect(res.body).to.have.property("message");
    });
    it("should return Email already exists", async () => {
      const res = await chai
        .request(server)
        .post(`${url}/register`)
        .send({
          name: "xavier",
          email: "xavier4@gmail.com",
          password: "123456"
        });
      expect(res).to.have.status(400);
      // expect(res.body).to.have.property("status");
      expect(res.body).to.have.property("message");
    });
    it("should create an account succesfully", async () => {
      const res = await chai
        .request(server)
        .post(`${url}/register`)
        .send({
          name: "xavier",
          email: "xavier4@gmail.com",
          password: "123456"
        });
      //   expect(res).to.have.status(200);
      //   expect(res.body).to.have.property("status");
      expect(res.body).to.have.property("message");
    });
  });

  describe("Testing the login method", () => {
    it("should return a validation error", async () => {
      const res = await chai
        .request(server)
        .post(`${url}/login`)
        .send({
          email: "xavier4.com",
          password: "12"
        });
      expect(res).to.have.status(400);
      // expect(res.body).to.have.property("status");
      //   expect(res.body).to.have.property("message");
    });

    it("should return Email not found", async () => {
      const res = await chai
        .request(server)
        .post(`${url}/login`)
        .send({
          email: "xavier4@gmail.com",
          password: "456789"
        });
      expect(res).to.have.status(400);
      // expect(res.body).to.have.property("message");
      //   expect(res.body).to.have.property("status");
    });

    it("should login a user successfully", async () => {
      const res = await chai
        .request(server)
        .post(`${url}/login`)
        .send({
          email: "xavier4@gmail.com",
          password: "123456"
        });
      expect(res).to.have.status(201);
      // expect(res.body).to.have.property("status");
      // expect(res.body).to.have.property("message");
    });

    it("should return Invalid password", async () => {
      const res = await chai
        .request(server)
        .post(`${url}/login`)
        .send({
          email: "xavier4@gmail.com",
          password: "123456ABC"
        });
      expect(res).to.have.status(400);
      // expect(res.body).to.have.property("status");
      // expect(res.body).to.have.property("message");
    });
  });
});
