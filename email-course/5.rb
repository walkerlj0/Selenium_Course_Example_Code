require 'selenium-webdriver'

describe 'Dynamic Loading' do

  before(:each) do
    @driver = Selenium::WebDriver.for :firefox
    @dynamic_loading = DynamicLoading.new(@driver)
  end

  after(:each) do
    @driver.quit
  end

  it 'Waited for Hidden Element' do
    @dynamic_loading.visit_example 1
    @dynamic_loading.start
    @dynamic_loading.finish_text_present?.should be_true
  end

  it 'Waited for Element To Render' do
    @dynamic_loading.visit_example 2
    @dynamic_loading.start
    @dynamic_loading.finish_text_present?.should be_true
  end

end

class DynamicLoading

  START_BUTTON  = { css: '#start button' }
  FINISH_TEXT   = { id: 'finish' }

  def initialize(driver)
    @driver = driver
  end

  def visit_example(example_number)
    @driver.get "http://the-internet.herokuapp.com/dynamic_loading/#{example_number}"
  end

  def start
    @driver.find_element(START_BUTTON).click
  end

  def finish_text_present?
    wait_for { is_displayed? FINISH_TEXT }
  end

  def is_displayed?(locator)
    @driver.find_element(locator).displayed?
  end

#  def is_displayed?(locator)
#    begin
#      @driver.find_element(locator).displayed?
#    rescue Selenium::WebDriver::Error::NoSuchElementError
#      false
#    end
#  end

  def wait_for(timeout = 15)
    Selenium::WebDriver::Wait.new(:timeout => timeout).until { yield }
  end

end
