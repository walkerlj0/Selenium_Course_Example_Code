require_relative '../pages/login'

describe 'Login' do

  before(:each) do
    driver_path = File.join(Dir.pwd, 'vendor', 'geckodriver')
    if File.file? driver_path
      service = Selenium::WebDriver::Service.firefox(path: driver_path)
      @driver = Selenium::WebDriver.for :firefox, service: service
    else
      @driver = Selenium::WebDriver.for :firefox
    end
    @login = Login.new(@driver)
  end

  after(:each) do
    @driver.quit
  end

  it 'succeeded' do
    @login.with('tomsmith', 'SuperSecretPassword!')
    expect(@login.success_message_present?).to be_truthy
  end

  it 'failed' do
    @login.with('asdf', 'asdf')
    expect(@login.failure_message_present?).to be_truthy
  end

end
