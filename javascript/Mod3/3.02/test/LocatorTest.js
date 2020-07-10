const { Builder, By } = require('selenium-webdriver')
const path = require('path')

//The Test
describe('Locate', function() {
   this.timeout(30000)
   let driver

   beforeEach(async function() {
   driver = await new Builder().forBrowser('firefox').build()
   })
   afterEach(async function() {
       await driver.quit()
   })
   it('check red button text' , async function() {
    await driver.get('https://the-internet.herokuapp.com/challenging_dom')
    await driver
        .findElement(By.className('button success'))
        .click()
    await driver
        .findElement(By.className('button'))
        .click()
        // Return the text of the red button id=button alert contains 'foo', 'bar', 'baz', or 'qux'
    var redButtonMessage = await driver
        .findElement(By.className('button alert'))
        .getText()
    console.log(redButtonMessage)
    }) 
})
   