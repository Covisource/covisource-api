const request = require("supertest")("http://localhost:4000");
const expect = require("chai").expect;
const json = require("./routes.json");
const get = json["GET"]["urls"];
const post = json["POST"]["urls"];
const chalk = require("chalk");
describe("GET", function () {
  for (let i = 0; i < get.length; i++) {
    it(`test if the API returns 200 (in index ${i}) to ${get[i]}`, async function () {
      const response = await request.get(get[i]);
      expect(response.body["success"]).eq(true);
    });
  }
});
describe("POST ", function () {
  for (let i = 0; i < post.length; i++) {
    var path = Object.keys(post[i])[0];
    it("test if the API returns 200", async function () {
      const response = await request.post(path).send(JSON.parse(post[i][path]));
      expect(response.body["success"]).equal(true);
    });
  }
});
