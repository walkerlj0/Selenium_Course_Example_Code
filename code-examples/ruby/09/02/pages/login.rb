require_relative 'base_page'

class Login < BasePage

  LOGIN_FORM  = { id: 'login' }
    USERNAME_INPUT = { id: 'username' }
    PASSWORD_INPUT = { id: 'password' }
  SUCCESS_MESSAGE = { css: '.flash.success' }
  FAILURE_MESSAGE = { css: '.flash.error' }

  def initialize(driver)
    super
    visit 'http://the-internet.herokuapp.com/login'
    is_displayed?(LOGIN_FORM).should == true
  end

  def with(username, password)
    type username, USERNAME_INPUT
    type password, PASSWORD_INPUT
    submit LOGIN_FORM
  end

  def success_message_present?
    is_displayed? SUCCESS_MESSAGE
  end

  def failure_message_present?
    is_displayed? FAILURE_MESSAGE
  end

end
