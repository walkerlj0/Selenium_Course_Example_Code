require 'selenium-webdriver'

describe 'Login' do

  before(:each) do
    driver_path = File.join(Dir.pwd, 'vendor', 'geckodriver')
    service = Selenium::WebDriver::Service.firefox(path: driver_path)
    @driver = Selenium::WebDriver.for :firefox
  end

  after(:each) do
    @driver.quit
  end

  it 'succeeded' do
    @driver.get 'http://the-internet.herokuapp.com/login'
    @driver.find_element(id: 'username').send_keys('tomsmith')
    @driver.find_element(id: 'password').send_keys('SuperSecretPassword!')
    @driver.find_element(id: 'login').submit
    @driver.find_element(class: 'flash success').displayed?.should be_true
    #@driver.find_element(class: 'flash successasdf').displayed?.should be_true
  end

end
