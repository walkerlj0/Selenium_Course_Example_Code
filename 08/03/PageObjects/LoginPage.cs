using OpenQA.Selenium;
using NUnit.Framework;

namespace PageObjects
{
    class LoginPage
    {
        IWebDriver Driver;
        By LoginForm = By.Id("login");
        By UsernameInput = By.Id("username");
        By PasswordInput = By.Id("password");
        By SubmitButton = By.CssSelector("button");
        By SuccessMessage = By.CssSelector(".flash.success");
        By FailureMessage = By.CssSelector(".flash.error");

        public LoginPage(IWebDriver Driver)
        {
            this.Driver = Driver;
            Driver.Navigate().GoToUrl("http://the-internet.herokuapp.com/login");
            Assert.That(Driver.FindElement(LoginForm).Displayed);
        }

        public void With(string Username, string Password)
        {
            Driver.FindElement(UsernameInput).SendKeys(Username);
            Driver.FindElement(PasswordInput).SendKeys(Password);
            Driver.FindElement(SubmitButton).Click();
        }

        public bool SuccessMessagePresent()
        {
            return Driver.FindElement(SuccessMessage).Displayed;
        }

        public bool FailureMessagePresent()
        {
            return Driver.FindElement(FailureMessage).Displayed;
        }
    }
}
