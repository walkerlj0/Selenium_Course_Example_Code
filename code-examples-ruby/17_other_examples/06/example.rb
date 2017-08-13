require 'selenium-webdriver'
require 'rspec-expectations'

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
  @driver.get 'http://the-internet.herokuapp.com/upload'
  uploader = @driver.find_element(id: 'file-upload')
  uploader.send_keys Dir.pwd + '/DaveHaeffner.jpg'
  uploader.submit

  uploaded_image = @driver.find_element(css: '.example img').attribute('src')
  uploaded_image.should =~ /DaveHaeffner.jpg/
end
