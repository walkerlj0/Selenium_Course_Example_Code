// filename: test/LoginTest.js
require('./spec_helper')
//const path = require('path')
const assert = require('assert')
const LoginPage = require('../pages/LoginPage')


//describe is a method from Mocha
describe('Login', function() { 

    let login
    beforeEach(async function() { 
    login = new LoginPage(this.driver)
    await login.load()
    })

    it('with valid credentials', async function() {
    await login.authenticate('tomsmith', 'SuperSecretPassword!')
    assert(await login.successMessagePresent(), 'Success message not displayed')
    })
  
    it('not invalid credentials', async function() {
      await login.authenticate('tomsmith', 'SuperSecretPassword!')
      assert(!(await login.failureMessagePresent()), 'Failure message displayed')
    })

})
