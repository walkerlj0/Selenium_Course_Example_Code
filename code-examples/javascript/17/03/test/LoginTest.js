require('./spec_helper')
const assert = require('assert')
const LoginPage = require('../pages/LoginPage')

describe('Login', function() {
  let login

  beforeEach(async function() {
    login = new LoginPage(this.driver)
    await login.load()
  })

  it('with valid credentials @shallow', async function() {
    await login.authenticate('tomsmith', 'SuperSecretPassword!')
    await this.eyes.checkWindow('Logged in')
    assert.equal(
      await login.isSuccessMessagePresent(),
      true,
      'Success message not displayed'
    )
    await this.eyes.close()
  })

  it('with invalid credentials @deep', async function() {
    await login.authenticate('tomsmith', 'bad password')
    await this.eyes.checkWindow('Failed login')
    assert.equal(
      await login.isFailureMessagePresent(),
      true,
      'Failure message not displayed'
    )
    await this.eyes.close()
  })

  it.only('forced failure @shallow', async function() {
    await login.authenticate('tomsmith', 'bad password')
    assert.equal(
      await login.isSuccessMessagePresent(),
      true,
      'Success message displayed'
    )
  })
})
