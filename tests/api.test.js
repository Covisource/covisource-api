const request = require("supertest")("http://localhost:4000");
const expect = require("chai").expect;
const json = require("./routes.json");
const get = json["GET"]["urls"];
const post = json["POST"]["urls"];
const chalk = require("chalk");
describe("Testing if Get requests return success", function () {
  for (let i = 0; i < get.length; i++) {
    it(`check if success is true`, async function () {
      const response = await request.get(get[i]);
      expect(response.body["success"]).eq(true);
    });
  }
});
describe("Testing if Get requests return success", function () {
  for (let i = 0; i < post.length; i++) {
    var path = Object.keys(post[i])[0];
    it("check if success is true", async function () {
      const response = await request.post(path).send(JSON.parse(post[i][path]));
      expect(response.body["success"]).equal(true);
    });
  }
});
