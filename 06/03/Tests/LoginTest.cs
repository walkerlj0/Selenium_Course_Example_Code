using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;

namespace Tests
{
    [TestFixture]
    class LoginTest
    {
        IWebDriver Driver;

        [SetUp]
        public void SetUp()
        {
            //FirefoxOptions Options = new FirefoxOptions() { UseLegacyImplementation = true };
            //Driver = new FirefoxDriver(Options);
            var VendorDirectory = System.IO.Directory.GetParent(
                                    System.AppDomain.CurrentDomain.BaseDirectory).
                                        Parent.Parent.FullName
                                            + @"\Vendor";
            var Service = FirefoxDriverService.CreateDefaultService(VendorDirectory);
            Driver = new FirefoxDriver(Service);
        }

        [TearDown]
        public void TearDown()
        {
            Driver.Quit();
        }

        [Test]
        public void ValidAccount()
        {
            Driver.Navigate().GoToUrl("http://the-internet.herokuapp.com/login");
            Driver.FindElement(By.Id("username")).SendKeys("tomsmith");
            Driver.FindElement(By.Id("password")).SendKeys("SuperSecretPassword!");
            Driver.FindElement(By.CssSelector("button")).Click();
            System.Threading.Thread.Sleep(1000);
            Assert.That(Driver.FindElement(By.CssSelector(".flash.success")).Displayed);
            //Assert.That(Driver.FindElement(By.CssSelector(".flash.successasdf")).Displayed);
        }
    }
}
