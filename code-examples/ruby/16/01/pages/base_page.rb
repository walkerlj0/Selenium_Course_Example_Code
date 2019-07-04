require_relative '../spec/config'

class BasePage
  include Config

  def initialize(driver)
    @driver = driver
  end

  def visit(url)
    if url.start_with? 'http'
      @driver.get url
    else
      @driver.get config[:base_url] + url
    end
  end

  def find(locator)
    @driver.find_element locator
  end

  def click(locator)
    find(locator).click
  end

  def type(text, locator)
    find(locator).send_keys text
  end

  def is_displayed?(locator)
    begin
      return find(locator).displayed?
    rescue Selenium::WebDriver::Error::NoSuchElementError
      return false
    end
  end

  def wait_for(seconds = 15)
    Selenium::WebDriver::Wait.new(timeout: seconds).until { yield }
  end

end
