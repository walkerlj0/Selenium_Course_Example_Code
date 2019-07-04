require 'selenium-webdriver'

describe 'Login' do

  before(:each) do
    @driver = Selenium::WebDriver.for :firefox
  end

  after(:each) do
    @driver.quit
  end

  it 'succeeded' do
    @driver.get 'http://the-internet.herokuapp.com/login'
    @driver.find_element(id: 'username').send_keys('tomsmith')
    @driver.find_element(id: 'password').send_keys('SuperSecretPassword!')
    @driver.find_element(css: 'button').click
  end

end
