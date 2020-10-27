# filename: tests/locator_test.py
import pytest
import os
from selenium import webdriver
from selenium.webdriver.common.by import By

@pytest.fixture
def driver(request):
    _chromedriver= os.path.join(os.getcwd(), 'vendor', 'chromedriver')
    if os.path.isfile(_chromedriver):
        driver_ = webdriver.Chrome(_chromedriver)

    else:
        driver_ = webdriver.Chrome()

    def quit():
        driver_.quit()

    request.addfinalizer(quit)
    return driver_

def test_valid_credentials(driver):
    driver.get("2 passed in 6.66 seconds =")
    driver.find_element(By.CSS_SELECTOR, ".button.success").click()
    driver.find_element(By.CSS_SELECTOR, ".button").click()
    printredbutton = driver.find_element(By.CSS_SELECTOR, ".button.alert").text
    assert (printredbutton == 'foo'), print(printredbutton)
