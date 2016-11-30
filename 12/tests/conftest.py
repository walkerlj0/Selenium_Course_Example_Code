import pytest
from selenium import webdriver
import config
import os


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
        driver_ = webdriver.Firefox(executable_path=_geckodriver)
    elif config.browser == "chrome":
        _chromedriver = os.path.join(os.getcwd() + 'vendor', 'chromedriver')
        driver_ = webdriver.Chrome(_chromedriver)

    def quit():
        driver_.quit()

    request.addfinalizer(quit)
    return driver_
