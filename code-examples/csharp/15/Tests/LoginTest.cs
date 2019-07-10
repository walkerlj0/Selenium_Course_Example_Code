using NUnit.Framework;
using PageObjects;

namespace Tests
{
    [TestFixture]
    [Parallelizable]
    class LoginTest : BaseTest
    {
        LoginPage Login;

        [SetUp]
        public new void SetUp()
        {
            Login = new LoginPage(Driver);
        }

        [Test]
        [Category("Shallow")]
        public void ValidAccount()
        {
            Login.With("tomsmith", "SuperSecretPassword!");
            Assert.That(Login.SuccessMessagePresent);
        }

        [Test]
        [Category("Deep")]
        public void InvalidAccount()
        {
            Login.With("tomsmith", "bad password");
            Assert.That(Login.FailureMessagePresent);
        }
    }
}
