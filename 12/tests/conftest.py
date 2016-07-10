import pytest
from selenium import webdriver
import os
import config


def pytest_addoption(parser):
    parser.addoption("--baseurl",
                     action="store",
                     default="http://the-internet.herokuapp.com",
                     help="base URL for the application under test")
    parser.addoption("--browser",
                     action="store",
                     default="firefox",
                     help="the name of the browser you want to test with")


@pytest.fixture(scope="function")
def driver(request):
    config.baseurl = request.config.getoption("--baseurl")
    config.browser = request.config.getoption("--browser").lower()

    if config.browser == "firefox":
        _driver = webdriver.Firefox()
    elif config.browser == "chrome":
        chromedriver = os.getcwd() + "/vendor/chromedriver"
        _driver = webdriver.Chrome(chromedriver)

    def quit():
        _driver.quit()

    request.addfinalizer(quit)
    return _driver
