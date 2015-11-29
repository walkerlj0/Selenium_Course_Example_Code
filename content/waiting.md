# Waiting

## Implicit Wait

+ Only needs to be configured once
+ Tells Selenium to wait for a specified amount of time before raising a `NoSuchElementError` exception
+ Less flexible than explicit waits

```ruby
driver.manage.timeouts.implicit_wait = 5
```

## Explicit Waits

+ Recommended way to wait in your tests
+ Specify an amount of time and an action
+ Selenium will try the action repeatedly until either:
  + the action can be accomplished
  + the amount of time has been reached (and throw a [TimeoutError](https://seleniumhq.github.io/selenium/docs/api/rb/Selenium/WebDriver/Error/TimeOutError.html))

```ruby
wait = Selenium::WebDriver::Wait.new(timeout: seconds)
wait.until { driver.find_element(locator).displayed? }
```

For more info:

+ [Explicit vs Implicit Waits](http://elementalselenium.com/tips/47-waiting)
+ [The case against using Implicit and Explicit Waits together](http://stackoverflow.com/questions/15164742/combining-implicit-wait-and-explicit-wait-together-results-in-unexpected-wait-ti#answer-15174978)
