from base_test import BaseTest
from pages import login_page


class TestLogin(BaseTest):

    def test_valid_credentials(self):
        login = login_page.LoginPage(self.driver)
        login._with("tomsmith", "SuperSecretPassword!")
        assert login.success_message_present()

