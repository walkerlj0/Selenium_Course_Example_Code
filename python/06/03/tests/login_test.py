import pytest
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.service import Service as FirefoxService


class TestLogin():

    @pytest.fixture
    def driver(self, request):
        _geckodriver = os.path.join(os.getcwd(), 'vendor', 'geckodriver')
        if os.path.isfile(_geckodriver):
            _service = FirefoxService(executable_path=_geckodriver)
            driver_ = webdriver.Firefox(service=_service)
        else:
            driver_ = webdriver.Firefox()

        def quit():
            driver_.quit()

        request.addfinalizer(quit)
        return driver_

    def test_valid_credentials(self, driver):
        driver.get("http://the-internet.herokuapp.com/login")
        driver.find_element(By.ID, "username").send_keys("tomsmith")
        driver.find_element(By.ID, "password").send_keys(
            "SuperSecretPassword!")
        driver.find_element(By.CSS_SELECTOR, "button").click()
        assert(
            driver.find_element(
                By.CSS_SELECTOR,
                ".flash.success").is_displayed())
        #assert(driver.find_element(By.CSS_SELECTOR, ".flash.successasdf").is_displayed())
