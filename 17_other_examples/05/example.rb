require 'selenium-webdriver'
require 'rspec-expectations'
require 'rest-client'

def setup
  @driver = Selenium::WebDriver.for :firefox
end

def teardown
  @driver.quit
end

def run
  setup
  yield
  teardown
end

run {
  @driver.get 'http://the-internet.herokuapp.com/download'
  link = @driver.find_element(css: 'a').attribute('href')
  response = RestClient.get link
  response.headers[:content_type].should == 'image/jpeg'
  response.headers[:content_length].to_i.should > 0
}
