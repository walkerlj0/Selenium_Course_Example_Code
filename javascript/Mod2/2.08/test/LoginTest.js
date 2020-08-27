
// filename: test/LoginTest.js
const { Builder } = require('selenium-webdriver') 
const path = require('path')
const assert = require('assert')

//describe is a method from Mocha
describe('Login', function() { 
    this.timeout(30000)
    let driver

    beforeEach(async function() { 
        /* const vendorDirectory =
        path.delimiter + path.join(__dirname, '..', 'vendor') 
        process.env.PATH += vendorDirectory */
    driver = await new Builder().forBrowser('firefox').build()
    })
    afterEach(async function() { 
        await driver.quit()
    })
    it('with valid credentials', async function() {
        await driver.get('http://the-internet.herokuapp.com/login') 
        await driver
            .findElement({ id: 'username' })
            .sendKeys('tomsmith') 
        await driver
            .findElement({ id: 'password' })
            .sendKeys('SuperSecretPassword!')
        await driver.findElement({ css: 'button' }).click()
        assert(
            await driver.findElement({ css: '.flash.success' }).isDisplayed(), 'Success message not displayed'
        )
    }) 
})
