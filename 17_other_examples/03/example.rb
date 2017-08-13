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

run {
  @driver.get 'http://the-internet.herokuapp.com/dropdown'

  drop_down_list = @driver.find_element(id: 'dropdown')
  options = drop_down_list.find_elements(tag_name: 'option')
  options.each { |option| option.click if option.text == 'Option 1' }

  selected_option = options.map { |option| option.text if option.selected? }.join
  selected_option.include?('Option 1').should == true
}

run {
  @driver.get 'http://the-internet.herokuapp.com/dropdown'

  dropdown = @driver.find_element(id: 'dropdown')
  select_list = Selenium::WebDriver::Support::Select.new(dropdown)
  select_list.select_by(:text, "Option 1")
  #select_list.select_by(:value, "1")
}

