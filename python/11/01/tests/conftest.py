import pytest
import os
from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService


@pytest.fixture
def driver(request):
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
