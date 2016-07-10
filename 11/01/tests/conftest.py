import pytest
from selenium import webdriver


@pytest.fixture
def driver(request):
    driver_ = webdriver.Firefox()

    def quit():
        driver_.quit()

    request.addfinalizer(quit)
    return driver_
