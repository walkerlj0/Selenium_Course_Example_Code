require 'selenium-webdriver'
require_relative 'login'

describe 'Login' do

  before(:each) do
    @driver = Selenium::WebDriver.for :firefox
    ENV['base_url'] = 'http://the-internet.herokuapp.com'
    @login = Login.new(@driver)
  end

  after(:each) do
    @driver.quit
  end

  it 'succeeded' do
    @login.with('tomsmith', 'SuperSecretPassword!')
    @login.success_message_present?.should be_true
  end

  it 'failed' do
    @login.with('asdf', 'asdf')
    @login.failure_message_present?.should be_true
  end

end
