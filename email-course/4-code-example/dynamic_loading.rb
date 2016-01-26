class DynamicLoading

  START_BUTTON  = { css: '#start button' }
  FINISH_TEXT   = { id: 'finish' }

  def initialize(driver)
    @driver = driver
  end

  def example(example_number)
    @driver.get "http://the-internet.herokuapp.com/dynamic_loading/#{example_number}"
  end

  def start
    @driver.find_element(START_BUTTON).click
  end

  def finish_text_present?
    wait_for(10) { @driver.find_element(FINISH_TEXT).displayed? }
  end

  private

  def wait_for(timeout = 5)
    begin
      Selenium::WebDriver::Wait.new(timeout: timeout).until { yield }
    rescue Selenium::WebDriver::Error::TimeoutError
      false
    end
  end

end
