class Login

  USERNAME_INPUT = { id: 'username' }
  PASSWORD_INPUT = { id: 'password' }
  SUBMIT_BUTTON   = { css: 'button' }
  SUCCESS_MESSAGE = { css: '.flash.success' }
  FAILURE_MESSAGE = { css: '.flash.error' }

  def initialize(driver)
    @driver = driver
    @driver.get 'http://the-internet.herokuapp.com/login'
  end

  def with(username, password)
    @driver.find_element(USERNAME_INPUT).send_keys(username)
    @driver.find_element(PASSWORD_INPUT).send_keys(password)
    @driver.find_element(SUBMIT_BUTTON).click
  end

  def success_message_present?
    @driver.find_element(SUCCESS_MESSAGE).displayed?
  end

  def failure_message_present?
    @driver.find_element(FAILURE_MESSAGE).displayed?
  end

end
