# filename: tests/conftest.py
import pytest
import os
from selenium import webdriver
from . import config


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
                     default="chrome",
                     help="the name of the browser you want to test with")
    parser.addoption("--browserversion",
                     action="store",
                     default="87.0",
                     help="the browser version you want to test with")
    parser.addoption("--platform",
                     action="store",
                     default="Windows 10",
                     help="the operating system to run your tests on (saucelabs only)")


@pytest.fixture
def driver(request):
    config.baseurl = request.config.getoption("--baseurl")
    config.host = request.config.getoption("--host").lower()
    config.browser = request.config.getoption("--browser").lower()
    config.browserversion = request.config.getoption("--browserversion").lower()
    config.platform = request.config.getoption("--platform").lower()

    if config.host == "saucelabs":
        test_name = request.node.name #added
        capabilities = {
            'browserName': config.browser,
            'browserVersion': config.browserversion,
            'platformName': config.platform,
            'sauce:options': {
                "name":test_name, #added
            }
        }
        _credentials = os.environ["SAUCE_USERNAME"] + ":" + os.environ["SAUCE_ACCESS_KEY"]
        _url = "https://" + _credentials + "@ondemand.saucelabs.com/wd/hub"
        driver_ = webdriver.Remote(_url, capabilities)

    else:
        if config.browser == "chrome":
            _chromedriver = os.path.join(os.getcwd(), 'vendor', 'chromedriver')
            if os.path.isfile(_chromedriver):
                driver_ = webdriver.Chrome(_chromedriver)
            else:
                driver_ = webdriver.Chrome()
        elif config.browser == "firefox":
            _geckodriver = os.path.join(os.getcwd(), 'vendor', 'geckodriver')
            if os.path.isfile(_geckodriver):
                # driver_ = webdriver.Firefox(_geckodriver)
                driver_ = webdriver.Firefox(executable_path=_geckodriver)
            else:
                driver_ = webdriver.Firefox()

    def quit():
        sauce_result = "failed" if request.node.rep_call.failed else "passed" #added
        driver_.execute_script("sauce:job-result={}".format(sauce_result)) #added
        driver_.quit()

    request.addfinalizer(quit)
    return driver_



@pytest.hookimpl(hookwrapper=True, tryfirst=True) #added all below
def pytest_runtest_makereport(item, call):
    # this sets the result as a test attribute for Sauce Labs reporting.
    outcome = yield
    rep = outcome.get_result()

    # set an report attribute for each phase of a call
    setattr(item, "rep_" + rep.when, rep)