import pytest
import os
from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService
from pages import login_page


class TestLogin():

    @pytest.fixture
    def login(self, request):
        _geckodriver = os.path.join(os.getcwd(), 'vendor', 'geckodriver')
        if os.path.isfile(_geckodriver):
            _service = FirefoxService(executable_path=_geckodriver)
            driver_ = webdriver.Firefox(service=_service)
        else:
            driver_ = webdriver.Firefox()

        def quit():
            driver_.quit()

        request.addfinalizer(quit)
        return login_page.LoginPage(driver_)

    def test_valid_credentials(self, login):
        login.with_("tomsmith", "SuperSecretPassword!")
        assert(login.success_message_present())

    def test_invalid_credentials(self, login):
        login.with_("tomsmith", "bad password")
        assert(login.failure_message_present())
        #assert(login.success_message_present() == False)
