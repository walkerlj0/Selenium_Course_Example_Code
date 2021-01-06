# filename: tests/login_test.py
import pytest
import os
from selenium import webdriver
from pages.login_page import LoginPage

@pytest.fixture
def login(request):
    _chromedriver = os.path.join(os.getcwd(), 'vendor', 'chromedriver')
    if os.path.isfile(_chromedriver):
        driver_ = webdriver.Chrome(_chromedriver)

    else:
        driver_ = webdriver.Chrome()

    loginPage = LoginPage(driver_)
    def quit():
        driver_.quit()

    request.addfinalizer(quit)
    return loginPage

def test_valid_credentials(login):
    login.with_("tomsmith", "SuperSecretPassword!")
    assert login.success_message_present()

def test_invalid_credentials(login):
    login.with_("tomsmith", "bad password")
    assert login.success_message_present() == False