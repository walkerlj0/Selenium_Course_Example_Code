import pytest
from pages import login_page


@pytest.fixture
def login(driver):
    return login_page.LoginPage(driver)

@pytest.mark.shallow
def test_valid_credentials(login):
    login._with("tomsmith", "SuperSecretPassword!")
    assert login.success_message_present()

@pytest.mark.shallow
def test_invalid_credentials(login):
    login._with("tomsmith", "bad password")
    assert login.failure_message_present()
    #assert self.login.success_message_present() == False

@pytest.mark.shallow
def test_forced_failure(login):
    login._with("tomsmith", "bad password")
    assert login.success_message_present()
