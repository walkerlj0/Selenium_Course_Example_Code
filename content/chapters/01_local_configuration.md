# Local Configuration

## Chrome

1. Download the latest ChromeDriver binary from [here](http://chromedriver.storage.googleapis.com/index.html)
2. Add it to your path, or tell Selenium where to find it
3. Create an instance of Chrome

```ruby
require 'selenium-webdriver'
Selenium::WebDriver::Chrome::Service.executable_path = './chromedriver'
driver = Selenium::WebDriver.for :chrome
```

For more info:

+ [the Selenium wiki page for ChromeDriver](https://github.com/seleniumhq/selenium/wiki/ChromeDriver)
+ [the official user documentation](https://sites.google.com/a/chromium.org/chromedriver/home)


## Firefox

1. Download the latest geckodriver binary from [here](https://github.com/mozilla/geckodriver/releases/latest)
2. Add it to your path, or tell Selenium where to find it
3. Create an instance of Firefox

```ruby
require 'selenium-webdriver'
geckodriver = File.join(Dir.pwd, 'vendor', 'geckodriver')
driver = Selenium::WebDriver.for :firefox, driver_path: geckodriver
```

To use the legacy FirefoxDriver:

1. Specify desired capabilities with `marionette` set to `false`
2. Pass in the desired capabilities when creating an instance of Firefox

```ruby
require 'selenium-webdriver'
driver = Selenium::WebDriver.for :firefox, desired_capabilities: { marionette: false }
```

For more info:

+ [the Selenium wiki page for FirefoxDriver](https://github.com/seleniumhq/selenium/wiki/FirefoxDriver)
+ [the geckodriver documentation from Mozilla](https://github.com/mozilla/geckodriver)


## Internet Explorer

Only available on Microsoft Windows.

1. Download the latest IEDriverServer from [here](http://selenium-release.storage.googleapis.com/index.html)
2. Add the downloaded file location to your [path](http://www.computerhope.com/issues/ch000549.htm)
3. Create an instance of Internet Explorer

```ruby
require 'selenium-webdriver'
driver = Selenium::WebDriver.for :internet_explorer
```

For more info:

+ [the Selenium wiki page for InternetExplorerDriver](https://github.com/seleniumhq/selenium/wiki/InternetExplorerDriver)


## Safari

+ Since Selenium 2.45.0, you need to manually install the SafariDriver browser extension
+ Download it from [here](http://selenium-release.storage.googleapis.com/index.html?path=2.48/)
+ Double-click to install it
+ Click `Trust` when prompted

```ruby
require 'selenium-webdriver'
driver = Selenium::WebDriver.for :safari
```

For more info:

+ [SafariDriver on the Selenium Wiki](https://github.com/seleniumhq/selenium/wiki/SafariDriver)
+ [Elemental Selenium tip 69](http://elementalselenium.com/tips/69-safari)

