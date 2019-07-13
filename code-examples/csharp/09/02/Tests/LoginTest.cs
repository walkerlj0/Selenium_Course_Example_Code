using System;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using PageObjects;

namespace Tests
{
    [TestFixture]
    class LoginTest
    {
        private static string VendorDirectory = System.IO.Directory.GetParent(
            System.AppContext.BaseDirectory).
            Parent.Parent.Parent.FullName
            + @"/vendor";
        protected IWebDriver Driver;
        LoginPage Login;

        [SetUp]
        public new void SetUp()
        {
            var Service = FirefoxDriverService.CreateDefaultService(VendorDirectory);
            Driver = new FirefoxDriver(Service);
            Login = new LoginPage(Driver);
        }

        [TearDownj
        protected void TearDown()
        {
            Driver.Quit();
        }

        [Test]
        public void ValidAccount()
        {
            Login.With("tomsmith", "SuperSecretPassword!");
            Assert.That(Login.SuccessMessagePresent);
        }

        [Test]
        public void InvalidAccount()
        {
            Login.With("tomsmith", "bad password");
            Assert.That(Login.FailureMessagePresent);
            //Assert.That(Login.SuccessMessagePresent, Is.False);
        }
    }
}
