import pytest
from pages import login_page


class TestLogin():

    @pytest.fixture
    def login(self, driver):
        return login_page.LoginPage(driver)

    def test_valid_credentials(self, login):
        login._with("tomsmith", "SuperSecretPassword!")
        assert login.success_message_present()

    def test_invalid_credentials(self, login):
        login._with("tomsmith", "bad password")
        assert login.failure_message_present()
        #assert self.login.success_message_present() == False

    @pytest.mark.shallow
    def test_forced_failure(self, login):
        login._with("tomsmith", "bad password")
        assert login.success_message_present()
