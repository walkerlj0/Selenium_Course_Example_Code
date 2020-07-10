require 'selenium-webdriver'

RSpec.configure do |c|

  c.before do |example|
    driver_path = File.join(Dir.pwd, 'vendor', 'geckodriver')
    if File.file? driver_path
      service = Selenium::WebDriver::Service.firefox(path: driver_path)
      @driver = Selenium::WebDriver.for :firefox, service: service
    else
      @driver = Selenium::WebDriver.for :firefox
    end
  end

  c.after do |example|
    @driver.quit
  end

end
