import pytest
from selenium import webdriver
from pages import dynamic_loading_page


class TestDynamicLoading():

    @pytest.fixture
    def dynamic_loading(self, request):
        driver_ = webdriver.Firefox()

        def quit():
            driver_.quit()

        request.addfinalizer(quit)
        return dynamic_loading_page.DynamicLoadingPage(driver_)

    def test_hidden_element(self, dynamic_loading):
        dynamic_loading.load_example("1")
        assert dynamic_loading.finish_text_present()
