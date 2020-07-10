import pytest
import os
from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService
from pages import dynamic_loading_page


class TestDynamicLoading():

    @pytest.fixture
    def dynamic_loading(self, request):
        _geckodriver = os.path.join(os.getcwd(), 'vendor', 'geckodriver')
        if os.path.isfile(_geckodriver):
            _service = FirefoxService(executable_path=_geckodriver)
            driver_ = webdriver.Firefox(service=_service)
        else:
            driver_ = webdriver.Firefox()

        def quit():
            driver_.quit()

        request.addfinalizer(quit)
        return dynamic_loading_page.DynamicLoadingPage(driver_)

    def test_hidden_element(self, dynamic_loading):
        dynamic_loading.load_example("1")
        assert(dynamic_loading.finish_text_present())
