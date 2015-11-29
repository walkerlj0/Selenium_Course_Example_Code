# Exception Handling

1. Rescue the relevant exceptions, returning `false` for each
2. Place in a helper method for easy reuse

```ruby
def is_displayed?(locator)
  begin
    driver.find_element(locator).displayed?
  rescue Selenium::WebDriver::Error::NoSuchElementError
    false
  rescue Selenium::WebDriver::Error::StaleElementReferenceError
    false
  end
end

is_displayed? locator
# Returns false if the element is not displayed.
# Otherwise, returns true.
```

For more info:

+ [Selenium's list of exceptions](https://seleniumhq.github.io/selenium/docs/api/rb/Selenium/WebDriver/Error.html)
