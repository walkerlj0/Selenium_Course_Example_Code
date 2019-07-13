require_relative '../pages/dynamic_loading'

describe 'Dynamic Loading' do

  before(:each) do
    driver_path = File.join(Dir.pwd, 'vendor', 'geckodriver')
    if File.file? driver_path
      service = Selenium::WebDriver::Service.firefox(path: driver_path)
      @driver = Selenium::WebDriver.for :firefox, service: service
    else
      @driver = Selenium::WebDriver.for :firefox
    end
    @dynamic_loading = DynamicLoading.new(@driver)
  end

  after(:each) do
    @driver.quit
  end

  it 'Example 1: Hidden Element' do
    @dynamic_loading.load '1'
    expect(@dynamic_loading.finish_text_present?).to be_truthy
  end

  it 'Example 2: Rendered after the fact' do
    @dynamic_loading.load '2'
    expect(@dynamic_loading.finish_text_present?).to be_truthy
  end

end
