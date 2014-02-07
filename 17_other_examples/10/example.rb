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

#run {
#  @driver.get 'http://the-internet.herokuapp.com/windows'
#  @driver.find_element(css: '.example a').click
#  @driver.switch_to.window(@driver.window_handles.first)
#  @driver.title.should_not =~ /New Window/
#  @driver.switch_to.window(@driver.window_handles.last)
#  @driver.title.should =~ /New Window/
#}

run {
  @driver.get 'http://the-internet.herokuapp.com/windows'
  main_window = @driver.window_handle
  @driver.find_element(css: '.example a').click
  windows = @driver.window_handles
  windows.each do |window|
   if main_window != window
      @new_window = window
    end
  end
  @driver.switch_to.window(main_window)
  @driver.title.should_not =~ /New Window/
  @driver.switch_to.window(@new_window)
  @driver.title.should =~ /New Window/
}
