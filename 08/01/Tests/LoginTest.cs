using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using PageObjects;

namespace Tests
{
    [TestFixture]
    class LoginTest
    {
        IWebDriver Driver;
        LoginPage Login;

        [SetUp]
        public void SetUp()
        {
            Driver = new FirefoxDriver();
            Login = new LoginPage(Driver);
        }

        [TearDown]
        public void TearDown()
        {
            Driver.Quit();
        }

        [Test]
        public void ValidAccount()
        {
            Login.With("tomsmith", "SuperSecretPassword!");
            Assert.That(Login.SuccessMessagePresent);
        }
    }
}
