import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By


class TestLogin():

    def test_valid_credentials(self):
        driver = webdriver.Firefox()
        driver.get("http://the-internet.herokuapp.com/login")
        driver.find_element(By.ID, "username").send_keys("tomsmith")
        driver.find_element(By.ID, "password").send_keys("SuperSecretPassword!")
        driver.find_element(By.CSS_SELECTOR, "button").click()
        assert driver.find_element(By.CSS_SELECTOR, ".flash.success").is_displayed()
