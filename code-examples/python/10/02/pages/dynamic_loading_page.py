from selenium.webdriver.common.by import By
from . base_page import BasePage


class DynamicLoadingPage(BasePage):
    _start_button = {"by": By.CSS_SELECTOR, "value": "#start button"}
    _finish_text = {"by": By.ID, "value": "finish"}

    def ___init___(self, driver):
        self.driver = driver

    def load_example(self, example_number):
        self._visit(
            "http://the-internet.herokuapp.com/dynamic_loading/" +
            example_number)
        self._click(self._start_button)

    def finish_text_present(self):
        return self._is_displayed(self._finish_text, 10)
