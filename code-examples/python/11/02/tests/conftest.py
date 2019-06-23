import pytest
import os
from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService
from . import config


def pytest_addoption(parser):
    parser.addoption("--baseurl",
                     action="store",
                     default="http://the-internet.herokuapp.com",
                     help="base URL for the application under test")


@pytest.fixture
def driver(request):
    config.baseurl = request.config.getoption("--baseurl")

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
