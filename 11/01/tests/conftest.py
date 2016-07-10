import pytest
from selenium import webdriver
import os


@pytest.fixture(scope="function")
def driver(request):
    _driver = webdriver.Firefox()

    def quit():
        _driver.quit()

    request.addfinalizer(quit)
    return _driver
