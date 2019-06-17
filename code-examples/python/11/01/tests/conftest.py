import pytest
import os
from selenium import webdriver


@pytest.fixture
def driver(request):
    _geckodriver = os.path.join(os.getcwd(), 'vendor', 'geckodriver')
    if os.path.isfile(_geckodriver):
        driver_ = webdriver.Firefox(executable_path=_geckodriver)
    else:
        driver_ = webdriver.Firefox()

    def quit():
        driver_.quit()

    request.addfinalizer(quit)
    return driver_
