import pytest
from selenium import webdriver
import os
import config


def pytest_addoption(parser):
    parser.addoption("--baseurl",
                     action="store",
                     default="http://the-internet.herokuapp.com",
                     help="base URL for the application under test")
    parser.addoption("--host",
                     action="store",
                     default="saucelabs",
                     help="where to run your tests: localhost or saucelabs")
    parser.addoption("--browser",
                     action="store",
                     default="internet explorer",
                     help="the name of the browser you want to test with")
    parser.addoption("--browserversion",
                     action="store",
                     default="10.0",
                     help="the browser version you want to test with")
    parser.addoption("--platform",
                     action="store",
                     default="Windows 7",
                     help="the operating system to run your tests on (saucelabs only)")


@pytest.fixture(scope="function")
def driver(request):
    config.baseurl = request.config.getoption("--baseurl")
    config.host = request.config.getoption("--host").lower()
    config.browser = request.config.getoption("--browser").lower()
    config.browserversion = request.config.getoption("--browserversion").lower()
    config.platform = request.config.getoption("--platform").lower()

    if config.host == "saucelabs":
        desired_caps = {}
        desired_caps["browserName"] = config.browser
        desired_caps["version"] = config.browserversion
        desired_caps["platform"] = config.platform
        desired_caps["name"] = request.cls.__name__ + "." + request.function.__name__
        credentials = os.environ["SAUCE_USERNAME"] + ":" + os.environ["SAUCE_ACCESS_KEY"]
        url = "http://" + credentials + "@ondemand.saucelabs.com:80/wd/hub"
        _driver = webdriver.Remote(url, desired_caps)
    if config.host == "localhost":
        if config.browser == "firefox":
            _driver = webdriver.Firefox()
        elif config.browser == "chrome":
            chromedriver = os.getcwd() + "/vendor/chromedriver"
            _driver = webdriver.Chrome(chromedriver)

    def quit():
        _driver.quit()

    request.addfinalizer(quit)
    return _driver
