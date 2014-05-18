# Cloud Configuration

## Sauce Labs

1. Store your Sauce Labs Username and Access Key in environment variables
2. Specify the browser and operating system you want through Selenium's Capabilities
3. Create an instance of Selenium using the Sauce Labs end-point, passing in the Capabilities

```ruby
ENV['SAUCE_USERNAME'] = 'your username goes here'
ENV['SAUCE_ACCESS_KEY'] = 'your access key goes here'

capabilities = Selenium::WebDriver::Remote::Capabilities.firefox
capabilities.version = "23"
capabilities.platform = "Windows XP"
driver = Selenium::WebDriver.for(
  :remote,
  :url => "http://SAUCE_USERNAME:SAUCE_ACCEESS_KEY@ondemand.saucelabs.com:80/wd/hub",
  :desired_capabilities => capabilities)
```

For more info:

+ [Sauce Labs Available Platforms page](https://saucelabs.com/platforms)
