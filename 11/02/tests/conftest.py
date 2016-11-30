import pytest
from selenium import webdriver
import config


def pytest_addoption(parser):
    parser.addoption("--baseurl",
                     action="store",
                     default="http://the-internet.herokuapp.com",
                     help="base URL for the application under test")


@pytest.fixture
def driver(request):
    config.baseurl = request.config.getoption("--baseurl")

    _geckodriver = os.path.join(os.getcwd(), 'vendor', 'geckodriver')
    driver_ = webdriver.Firefox(executable_path=_geckodriver)

    def quit():
        driver_.quit()

    request.addfinalizer(quit)
    return driver_
