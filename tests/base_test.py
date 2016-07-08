from selenium import webdriver


class BaseTest:

    def setup(self):
        self.driver = webdriver.Firefox()

    def teardown(self):
        self.driver.quit()
