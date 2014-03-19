# filename: spec/spec_helper.rb

require 'selenium-webdriver'

RSpec.configure do |config|

  config.before(:each) do
    case ENV['host']
    when 'saucelabs'
      caps = Selenium::WebDriver::Remote::Capabilities.send(ENV['browser'])
      caps.version = ENV['browser_version']
      caps.platform = ENV['operating_system']
      caps[:name] = example.metadata[:full_description]

      @driver = Selenium::WebDriver.for(
        :remote,
        url: "http://#{ENV['SAUCE_USERNAME']}:#{ENV['SAUCE_ACCESS_KEY']}@ondemand.saucelabs.com:80/wd/hub",
        desired_capabilities: caps)
    else
      @driver = Selenium::WebDriver.for :firefox
    end
  end

  config.after(:each) do
    @driver.quit
  end

end
