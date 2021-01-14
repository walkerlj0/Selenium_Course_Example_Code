# filename: tests/login_test.py
import pytest
from pages import login_page


@pytest.fixture
def login(driver):
    return login_page.LoginPage(driver)

def test_valid_credentials(login):
    login.with_("tomsmith", "SuperSecretPassword!")
    assert login.success_message_present()

def test_invalid_credentials(login):
    login.with_("tomsmith", "bad password")
    assert login.success_message_present() == False