# Waiting

## Implicit Wait

+ Only needs to be configured once
+ Tells Selenium to wait for a specified amount of time before raising a `NoSuchElementError` exception
+ Can be overridden with an explicit wait

`driver.manage.timeouts.implicit_wait = 3`

For more info:

+ [Explicit vs Implicit Waits](http://elementalselenium.com/tips/47-waiting)

## Explicit Waits

+ Specify an amount of time and an action
+ Selenium will try the action repeatedly until either:
  + the action can be accomplished
  + the amount of time has been reached (and throw a timeout exception)

```ruby
wait = Selenium::WebDriver::Wait.new(timeout: seconds)
wait.until { driver.find_element(locator).displayed? }
```

For more info:

+ [Explicit vs Implicit Waits](http://elementalselenium.com/tips/47-waiting)
