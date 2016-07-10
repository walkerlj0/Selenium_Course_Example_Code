import pytest
from selenium import webdriver
import os
import config


def pytest_addoption(parser):
    parser.addoption("--baseurl",
                     action="store",
                     default="http://the-internet.herokuapp.com",
                     help="base URL for the application under test")


@pytest.fixture(scope="function")
def driver(request):
    config.baseurl = request.config.getoption("--baseurl")

    _driver = webdriver.Firefox()

    def quit():
        _driver.quit()

    request.addfinalizer(quit)
    return _driver
