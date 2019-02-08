require("./spec_helper");
const assert = require("assert");
const LoginPage = require("../pages/LoginPage");

describe("Login", function() {
  beforeEach(async function() {
    await LoginPage.load(this.driver);
  });

  it("with valid credentials @shallow", async function() {
    await LoginPage.authenticate("tomsmith", "SuperSecretPassword!");
    await this.eyes.checkWindow("Logged in");
    assert.equal(
      await LoginPage.isSuccessMessagePresent(),
      true,
      "Success message not displayed"
    );
    await this.eyes.close();
  });

  it.only("with invalid credentials @deep", async function() {
    await LoginPage.authenticate("tomsmith", "bad password");
    await this.eyes.checkWindow("Failed login");
    assert.equal(
      await LoginPage.isFailureMessagePresent(),
      true,
      "Failure message not displayed"
    );
    await this.eyes.close();
  });

  it.only("forced failure @shallow", async function() {
    await LoginPage.authenticate("tomsmith", "bad password");
    assert.equal(
      await LoginPage.isSuccessMessagePresent(),
      true,
      "Success message displayed"
    );
  });
});
