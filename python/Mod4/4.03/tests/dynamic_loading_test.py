# filename: tests/dynamic_loading_test.py
import pytest
from pages import dynamic_loading_page



@pytest.fixture
def dynamic_loading(driver):
    return dynamic_loading_page.DynamicLoadingPage(driver)

def test_hidden_element(dynamic_loading):
    dynamic_loading.load_example("1")
    assert dynamic_loading.finish_text_present()

def test_rendered_element(dynamic_loading):
    dynamic_loading.load_example("2")
    assert dynamic_loading.finish_text_present()