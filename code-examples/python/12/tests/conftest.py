import pytest
import os
from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.chrome.service import Service as ChromeService
from . import config


def pytest_addoption(parser):
    parser.addoption("--baseurl",
                     action="store",
                     default="http://the-internet.herokuapp.com",
                     help="base URL for the application under test")
    parser.addoption("--browser",
                     action="store",
                     default="firefox",
                     help="the name of the browser you want to test with")


@pytest.fixture
def driver(request):
    config.baseurl = request.config.getoption("--baseurl")
    config.browser = request.config.getoption("--browser").lower()

    if config.browser == "firefox":
        _geckodriver = os.path.join(os.getcwd(), 'vendor', 'geckodriver')
        if os.path.isfile(_geckodriver):
            _service = FirefoxService(executable_path=_geckodriver)
            driver_ = webdriver.Firefox(service=_service)
        else:
            driver_ = webdriver.Firefox()
    elif config.browser == "chrome":
        _chromedriver = os.path.join(os.getcwd() + 'vendor', 'chromedriver')
        if os.path.isfile(_chromedriver):
            _service = ChromeService(executable_path=_geckodriver)
            driver_ = webdriver.Chrome(service=_service)
        else:
            driver_ = webdriver.Chrome()

    def quit():
        driver_.quit()

    request.addfinalizer(quit)
    return driver_
