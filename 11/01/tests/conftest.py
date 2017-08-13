import pytest
from selenium import webdriver


@pytest.fixture
def driver(request):
    _geckodriver = os.path.join(os.getcwd(), 'vendor', 'geckodriver')
    driver_ = webdriver.Firefox(executable_path=_geckodriver)

    def quit():
        driver_.quit()

    request.addfinalizer(quit)
    return driver_
