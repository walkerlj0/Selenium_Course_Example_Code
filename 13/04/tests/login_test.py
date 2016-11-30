import pytest
from pages import login_page


class TestLogin():

    @pytest.fixture
    def login(self, driver):
        return login_page.LoginPage(driver)

    def test_valid_credentials(self, login):
        login.with_("tomsmith", "SuperSecretPassword!")
        assert(login.success_message_present())

    def test_invalid_credentials(self, login):
        login.with_("tomsmith", "bad password")
        assert(login.failure_message_present())
        # assert(self.login.success_message_present() == False)
