using System;
using OpenQA.Selenium;

namespace PageObjects
{
    public class LoginPage : BasePage
    {
        By UsernameInput = By.Id("username");
        By PasswordInput = By.Id("password");
        By SubmitButton = By.CssSelector("button");
        By SuccessMessage = By.CssSelector(".flash.success");
        By FailureMessage = By.CssSelector(".flash.error");

        public LoginPage(IWebDriver Driver) : base(Driver)
        {
            Visit("http://the-internet.herokuapp.com/login");
        }

        public void With(String Username, String Password)
        {
            Type(UsernameInput, Username);
            Type(PasswordInput, Password);
            Click(SubmitButton);
        }

        public Boolean SuccessMessagePresent()
        {
            return IsDisplayed(SuccessMessage);
        }

        public Boolean FailureMessagePresent()
        {
            return IsDisplayed(FailureMessage);
        }
    }
}
