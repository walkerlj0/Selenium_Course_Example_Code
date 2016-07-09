import pytest
from selenium import webdriver
import os
import config


def pytest_addoption(parser):
    parser.addoption("--baseurl",
                     action="store",
                     default="http://the-internet.herokuapp.com",
                     help="provide base URL of application under test")
    parser.addoption("--host",
                     action="store",
                     default="saucelabs",
                     help="where to run your tests: localhost or saucelabs")
    parser.addoption("--browser",
                     action="store",
                     default="internet explorer",
                     help="provide the name of the browser you want to test with")
    parser.addoption("--browserversion",
                     action="store",
                     default="10.0",
                     help="provide the browser version you want to test with")
    parser.addoption("--platform",
                     action="store",
                     default="Windows 7",
                     help="provide the operating system you want to run your tests on (saucelabs only)")

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    setattr(item, "rep_" + rep.when, rep)


@pytest.fixture(scope = "function")
def driver(request):
    config.baseurl = request.config.getoption("--baseurl")
    config.host = request.config.getoption("--host").lower()
    config.browser = request.config.getoption("--browser").lower()
    config.browserversion = request.config.getoption("--browserversion").lower()
    config.platform = request.config.getoption("--platform").lower()

    if config.host == "saucelabs":
        desired_caps = { }
        desired_caps["browserName"] = config["browser"]
        desired_caps["version"] = config["browserversion"]
        desired_caps["platform"] = config["platform"]
        desired_caps["name"] = request.function.__name__
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
        try:
            if config.host == "saucelabs":
                if request.node.rep_call.failed:
                    _driver.execute_script("sauce:job-result=failed")
                    print "\nhttp://saucelabs.com/beta/tests/" + _driver.session_id
                elif request.node.rep_call.passed:
                    _driver.execute_script("sauce:job-result=passed")
        finally:
            _driver.quit()

    request.addfinalizer(quit)
    return _driver
