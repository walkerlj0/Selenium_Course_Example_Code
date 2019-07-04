require 'selenium-webdriver'
require_relative 'config'

RSpec.configure do |c|
  include Config

  c.before do |example|
    case config[:host] when 'saucelabs'
      caps = Selenium::WebDriver::Remote::Capabilities.send(config[:browser_name])
      caps[:browser_version] = config[:browser_version]
      caps[:platform_name] = config[:platform_name]
      url = "http://#{config[:sauce_username]}:#{config[:sauce_access_key]}@ondemand.saucelabs.com:80/wd/hub"
      @driver = Selenium::WebDriver.for(
        :remote,
        url: url,
        desired_capabilities: caps)
    when 'localhost'
      case config[:browser_name]
      when 'firefox'
        driver_path = File.join(Dir.pwd, 'vendor', 'geckodriver')
        if File.file? driver_path
          service = Selenium::WebDriver::Service.firefox(path: driver_path)
        end
      when 'chrome'
        driver_path = File.join(Dir.pwd, 'vendor', 'chromedriver')
        if File.file? driver_path
          service = Selenium::WebDriver::Service.chrome(path: driver_path)
        end
      end
      if service
        @driver = Selenium::WebDriver.for config[:browser_name].to_sym, service: service
      else
        @driver = Selenium::WebDriver.for config[:browser_name].to_sym
      end
    end
  end

  c.after do |example|
    begin
      if config[:host] == 'saucelabs'
        test_passed = example.exception.nil?
        @driver.execute_script("sauce:job-name=#{example.full_description}")
        @driver.execute_script("sauce:job-result=#{test_passed}")
        if !test_passed
          puts "Watch a video of the test at https://saucelabs.com/tests/#{@driver.session_id}"
        end
      end
    ensure
      @driver.quit
    end
  end

end
