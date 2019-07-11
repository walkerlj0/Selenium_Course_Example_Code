using System;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using PageObjects;

namespace Tests
{
    [TestFixture]
    class LoginTest : BaseTest
    {
        protected IWebDriver Driver;
        private static string VendorDirectory;
        LoginPage Login;

        [SetUp]
        public new void SetUp()
        {
            VendorDirectory = System.IO.Directory.GetParent(
              System.AppContext.BaseDirectory).
              Parent.Parent.Parent.FullName
              + @"/vendor";
            var Service = FirefoxDriverService.CreateDefaultService(VendorDirectory);
            Driver = new FirefoxDriver(Service);
            Login = new LoginPage(Driver);
        }

        [Test]
        public void ValidAccount()
        {
            Login.With("tomsmith", "SuperSecretPassword!");
            Assert.That(Login.SuccessMessagePresent);
        }
    }
}
