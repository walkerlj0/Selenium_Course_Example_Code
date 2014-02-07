require_relative 'dynamic_loading'

describe 'Dynamic Loading' do

  before(:each) do
    @driver = Selenium::WebDriver.for :firefox
    ENV['base_url'] = 'http://the-internet.herokuapp.com'
    @dynamic_loading = DynamicLoading.new(@driver)
  end

  after(:each) do
    @driver.quit
  end

  it 'Example 1: Hidden Element' do
    @dynamic_loading.start
    @dynamic_loading.finish_text_present?.should be_true
  end

end
