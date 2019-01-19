import pytest
from selenium import webdriver
import config
import os


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


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """
    grab the test outcome and store the result
    add the result for each phase of a call ("setup", "call", and "teardown")
    as an attribute to the request.node object in a fixture
    e.g.,
        request.node.result_call.failed
        request.node.result_call.passed
    """
    outcome = yield
    result = outcome.get_result()
    setattr(item, "result_" + result.when, result)


@pytest.fixture
def driver(request):
    config.baseurl = request.config.getoption("--baseurl")
    config.host = request.config.getoption("--host").lower()
    config.browser = request.config.getoption("--browser").lower()
    config.browserversion = request.config.getoption("--browserversion").lower()
    config.platform = request.config.getoption("--platform").lower()

    if config.host == "saucelabs":
        _desired_caps = {}
        _desired_caps["browserName"] = config.browser
        _desired_caps["version"] = config.browserversion
        _desired_caps["platform"] = config.platform
        _desired_caps["name"] = request.cls.__name__ + "." + request.function.__name__
        _credentials = os.environ["SAUCE_USERNAME"] + ":" + os.environ["SAUCE_ACCESS_KEY"]
        _url = "http://" + _credentials + "@ondemand.saucelabs.com:80/wd/hub"
        driver_ = webdriver.Remote(_url, _desired_caps)
    if config.host == "localhost":
        if config.browser == "firefox":
            _geckodriver = os.path.join(os.getcwd(), 'vendor', 'geckodriver')
            driver_ = webdriver.Firefox(executable_path=_geckodriver)
        elif config.browser == "chrome":
            _chromedriver = os.path.join(os.getcwd() + 'vendor', 'chromedriver')
            driver_ = webdriver.Chrome(_chromedriver)

    def quit():
        try:
            if config.host == "saucelabs":
                if request.node.result_call.failed:
                    driver_.execute_script("sauce:job-result=failed")
                    raise AssertionError("http://saucelabs.com/beta/tests/" + driver_.session_id)
                elif request.node.result_call.passed:
                    driver_.execute_script("sauce:job-result=passed")
        finally:
            driver_.quit()

    request.addfinalizer(quit)
    return driver_
