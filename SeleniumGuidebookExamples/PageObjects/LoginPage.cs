using System;
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

        public LoginPage(IWebDriver Driver) : base(Driver)
        {
            Visit("/login");
            Assert.That(IsDisplayed(LoginForm));
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
