# Hovers

1. Find the element
2. Create an action with the Selenium Action builder
3. Pass in the found element when calling the `move_to` action
4. Perform the action

```ruby
element = driver.find_element(locator)
driver.action.move_to(element).perform
```

For more info:

+ [Selenium's Action Builder `move_to` documentation](https://seleniumhq.github.io/selenium/docs/api/rb/Selenium/WebDriver/ActionBuilder.html#move_to-instance_method)
