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

+ [the Selenium wiki page for ChromeDriver](https://code.google.com/p/selenium/wiki/ChromeDriver)
+ [the official user documentation](https://sites.google.com/a/chromium.org/chromedriver/home)


## Firefox

Available out of the box.

```ruby
require 'selenium-webdriver'
driver = Selenium::WebDriver.for :firefox
```

For more info:

+ [the Selenium wiki page for FirefoxDriver](https://sites.google.com/a/chromium.org/chromedriver/home)


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

+ [the Selenium wiki page for InternetExplorerDriver](https://code.google.com/p/selenium/wiki/InternetExplorerDriver)


## Opera
Only works for version 12.16 or earlier. For newer versions of Opera, test using Chrome (since it uses the same back-end).

1. Download the latest Selenium Standalone Server from [here](http://selenium-release.storage.googleapis.com/index.html)
2. Create an environment variable pointing to the server file
3. Create an instance of Opera

```ruby
require 'selenium-webdriver'
ENV['SELENIUM_SERVER_JAR'] = './selenium-server-standalone.jar'
driver = Selenium::WebDriver.for :opera
driver.get 'http://www.google.com'
driver.quit
```

For more info:

+ [The Selenium wiki page for OperaDriver](https://code.google.com/p/selenium/wiki/OperaDriver)


## Safari

Available out of the box as of version 2.21 of Selenium.

```ruby
require 'selenium-webdriver'
driver = Selenium::WebDriver.for :firefox
```

For more info:

+ [the Selenium wiki page for SafariDriver](https://code.google.com/p/selenium/wiki/SafariDriver)
