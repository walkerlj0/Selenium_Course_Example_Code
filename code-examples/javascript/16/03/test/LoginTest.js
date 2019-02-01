const assert = require("assert");
require("./spec_helper");
const LoginPage = require("../pages/LoginPage");

describe("Login", function() {
  this.timeout(global.test_timeout);

  beforeEach(async function() {
    await LoginPage.load();
  });

  it("with valid credentials @shallow", async function() {
    await LoginPage.authenticate("tomsmith", "SuperSecretPassword!");
    assert.equal(
      await LoginPage.isSuccessMessagePresent(),
      true,
      "Success message not displayed"
    );
  });

  it("with invalid credentials @deep", async function() {
    await LoginPage.authenticate("tomsmith", "bad password");
    assert.equal(
      await LoginPage.isFailureMessagePresent(),
      true,
      "Failure message not displayed"
    );
    //assert.equal(
    //  await LoginPage.isSuccessMessagePresent(),
    //  false,
    //  "Success message displayed"
    //);
  });

  it.skip("forced failure @shallow", async function() {
    await LoginPage.authenticate("tomsmith", "bad password");
    assert.equal(
      await LoginPage.isSuccessMessagePresent(),
      true,
      "Success message displayed"
    );
  });
});
