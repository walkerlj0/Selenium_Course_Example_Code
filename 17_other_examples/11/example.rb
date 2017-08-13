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

run do
  @driver.get 'http://admin:admin@the-internet.herokuapp.com/download_secure'
  link = @driver.find_element(css: 'a').attribute('href')
  cookie = @driver.manage.cookie_named 'rack.session'
  response = RestClient.head link, cookie: "#{cookie[:name]}=#{cookie[:value]};"
  response.headers[:content_type].should == 'application/pdf'
  response.headers[:content_length].to_i.should > 0
end
