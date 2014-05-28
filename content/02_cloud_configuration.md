# Cloud Configuration

## Sauce Labs

### Initial Setup

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

### Setting the Job Status

1. Install [the `sauce_whisk` gem](https://github.com/saucelabs/sauce_whisk)
2. Add `require 'sauce_whisk'` to your test harness configuration
2. Use `sauce_whisk` to mark the Sauce job as passed or failed by using Selenium's `session_id`

```ruby
# an RSpec example
require 'sauce_whisk'

if example.exception.nil?
  SauceWhisk::Jobs.pass_job @driver.session_id
else
  SauceWhisk::Jobs.fail_job @driver.session_id
end
```

### Using Sauce Connect for Private Apps

1. Install [the `sauce_connect` gem](https://github.com/saucelabs/sauce_ruby)
2. Add `require 'sauce'` to your test harness configuration
3. Start the Sauce Connect tunnel
4. Run your tests

```ruby
require 'sauce'
Sauce::Utilities::Connect.start
```
