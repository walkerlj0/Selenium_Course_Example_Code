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

Available out of the box.

```ruby
require 'selenium-webdriver'
driver = Selenium::WebDriver.for :firefox
```

For more info:

+ [the Selenium wiki page for FirefoxDriver](https://github.com/seleniumhq/selenium/wiki/FirefoxDriver)


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

Available out of the box as of version 2.21 of Selenium.

```ruby
require 'selenium-webdriver'
driver = Selenium::WebDriver.for :safari
```

For more info:

+ [the Selenium wiki page for SafariDriver](https://github.com/seleniumhq/selenium/wiki/SafariDriver)
= [Elemental Selenium tip 69](http://elementalselenium.com/tips/69-safari)
