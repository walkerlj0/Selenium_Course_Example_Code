using OpenQA.Selenium;
using NUnit.Framework;

namespace PageObjects
{
    class LoginPage : BasePage
    {
        By LoginForm = By.Id("login");
        By UsernameInput = By.Id("username");
        By PasswordInput = By.Id("password");
        By SubmitButton = By.CssSelector("button");
        By SuccessMessage = By.CssSelector(".flash.success");
        By FailureMessage = By.CssSelector(".flash.error");

        public LoginPage(IWebDriver driver) : base(driver)
        {
            Visit("http://the-internet.herokuapp.com/login");
            Assert.That(IsDisplayed(LoginForm));
        }

        public void With(string username, string password)
        {
            Type(UsernameInput, username);
            Type(PasswordInput, password);
            Click(SubmitButton);
            System.Threading.Thread.Sleep(1000);
        }

        public bool SuccessMessagePresent()
        {
            return IsDisplayed(SuccessMessage);
        }

        public bool FailureMessagePresent()
        {
            return IsDisplayed(FailureMessage);
        }
    }
}
