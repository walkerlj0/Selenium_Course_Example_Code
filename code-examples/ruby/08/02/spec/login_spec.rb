require 'selenium-webdriver'
require_relative 'login'

describe 'Login' do

  before(:each) do
    driver_path = File.join(Dir.pwd, 'vendor', 'geckodriver')
    if File.file? driver_path
      service = Selenium::WebDriver::Service.firefox(path: driver_path)
      @driver = Selenium::WebDriver.for :firefox, service: service
    else
      @driver = Selenium::WebDriver.for :firefox
    end
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
    #@login.success_message_present?.should be_false
  end

end
