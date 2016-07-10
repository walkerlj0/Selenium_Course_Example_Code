import pytest
from selenium import webdriver
from pages import login_page


class TestLogin():

    @pytest.fixture
    def login(self, request):
        driver_ = webdriver.Firefox()

        def quit():
            driver_.quit()

        request.addfinalizer(quit)
        return login_page.LoginPage(driver_)

    def test_valid_credentials(self, login):
        login.with_("tomsmith", "SuperSecretPassword!")
        assert login.success_message_present()
