# Exception Handling

1. Rescue the relevant exceptions in a helper method, returning false for each
2. Create a convenience method to see if an element is displayed

```ruby
def rescue_exceptions
  begin
    yield
  rescue Selenium::WebDriver::Error::NoSuchElementError
    false
  rescue Selenium::WebDriver::Error::StaleElementReferenceError
    false
  end
end

def is_displayed?
  rescue_exceptions { yield }
end

is_displayed? { driver.find_element(locator).displayed? }
# will return false if the element is not displayed
# otherwise, it will return true
```

For more info:
+ [a full list of Selenium exceptions](https://selenium.googlecode.com/git/docs/api/rb/Selenium/WebDriver/Error.html)
