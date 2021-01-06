# filename: tests/dynamic_loading_test.py
import pytest
import os
from selenium import webdriver
from pages.dynamic_loading_page import DynamicLoadingPage


@pytest.fixture
def dynamic_loading(request):
    _chromedriver = os.path.join(os.getcwd(), 'vendor', 'chromedriver')
    if os.path.isfile(_chromedriver):
        driver_ = webdriver.Chrome(_chromedriver)

    else:
        driver_ = webdriver.Chrome()

    dynamic_loading = DynamicLoadingPage(driver_)
    def quit():
        driver_.quit()

    request.addfinalizer(quit)
    return dynamic_loading

def test_hidden_element(dynamic_loading):
    dynamic_loading.load_example("1")
    assert dynamic_loading.finish_text_present()

def test_rendered_element(dynamic_loading):
    dynamic_loading.load_example("2")
    assert dynamic_loading.finish_text_present()