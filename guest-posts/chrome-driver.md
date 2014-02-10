It's straightforward to get your tests running locally against Firefox. But when you want to run them against a different browser like Chrome you quickly run into configuration overhead that can seem overly complex and lacking in code examples for all of Selenium's supported programming languages.

## A Brief Primer on Browser Drivers

With the introduction of WebDriver (circa Selenium 2) a lot of benefits were realized (e.g. more effective & faster browser execution, no more single host origin issues, etc). But with it came some architectural & configuration differences that may not be widely known. Namely -- browser drivers.

WebDriver works with each of the major browsers through a browser driver which is (ideally) maintained by the browser manufacturer. It is an executable file (consider it a thin layer or a shim) that acts as a bridge between Selenium and the browser.

Here's a list:

+ [ChromeDriver](https://code.google.com/p/selenium/wiki/ChromeDriver)
+ [FirefoxDriver](https://code.google.com/p/selenium/wiki/FirefoxDriver)
+ [InternetExplorer Driver](https://code.google.com/p/selenium/wiki/InternetExplorerDriver)
+ [OperaDriver](https://code.google.com/p/selenium/wiki/OperaDriver)
+ [SafariDriver](https://code.google.com/p/selenium/wiki/SafariDriver)

Let's step through an example using the [ChromeDriver](https://code.google.com/p/selenium/wiki/ChromeDriver).

## An Example

Before starting, I downloaded the latest ChromeDriver binary executable from [here](http://chromedriver.storage.googleapis.com/index.html) into the same directory as the script. I found the link for from [the ChromeDriver documentation](https://code.google.com/p/selenium/wiki/ChromeDriver).

In our script I include the dependent libraries (`selenium-webdriver` to drive the browser and `rspec-expectations` to perform assertions), wire up `setup`, `teardown`, and `run` actions. And include a simple test to demonstrate functionality.

```ruby
require 'selenium-webdriver'
require 'rspec-expectations'

def setup
  Selenium::WebDriver::Chrome::Service.executable_path = File.join(Dir.pwd, './chromedriver')
  @driver = Selenium::WebDriver.for :chrome
end

def teardown
  @driver.quit
end

def run
  setup
  yield
  teardown
end

run do
  @driver.get 'http://the-internet.herokuapp.com/'
  @driver.title.should == 'The Internet'
end
```

Note that in `setup` we are telling WebDriver where the ChromeDriver exectuable is before attempting to fire up the browser. You could also avoid this configuration step by simply adding ChromeDriver to your path.

In either case, the end result should be the same. When you run your test, Selenium will find and launch the ChromeDriver executable which will launch and drive Chrome.

This is great for one-off, small test suites. But as things grow this approach will be very slow since for each test the browser driver will get spawned and the terminated. Alternatively, we can launch ChromeDriver on our own (e.g. from the terminal with `./chromedriver`) and connect to it using Remote WebDriver, like so:

```ruby
def setup
  @driver = Selenium::WebDriver.for :remote, url: 'http://localhost:9515', desired_capabilities: :chrome
end
```

This way we can launch ChromeDriver once, run as many tests as we want, and then close it down.

## Expected Behavior

+ ChromeDriver starts
+ Test connects to it and opens the Chrome browser
+ Test completes
+ Browser closes
+ ChromeDriver stops

## Free Weekly Tips On Selenium

I don't want your Selenium education to end here, so I put together a free weekly tip newsletter called __Elemental Selenium__. It walks through the strategy, tactics, and code examples necessary to use Selenium like a Pro. You can learn more about it and sign-up [here](http://elementalselenium.com/).
