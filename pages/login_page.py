class LoginPage():
    _login_form = "login"
    _username_input = "username"
    _password_input = "password"
    _submit_button = 'button'
    _success_message = ".flash.success"
    _failure_message = ".flash.error"

    def __init__(self, driver):
        self.driver = driver
        self.driver.get("http://the-internet.herokuapp.com/login")
        assert self.driver.find_element_by_id(self._login_form).is_displayed()

    def _with(self, username, password):
        self.driver.find_element_by_id(self._username_input).send_keys(username)
        self.driver.find_element_by_id(self._password_input).send_keys(password)
        self.driver.find_element_by_css_selector(self._submit_button).click()

    def success_message_present(self):
        return self.driver.find_element_by_css_selector(self._success_message).is_displayed()

    def failure_message_present(self):
        return self.driver.find_element_by_css_selector(self._failure_message).is_displayed()
