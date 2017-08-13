# Key Presses

```ruby
# find and send to an element
@driver.get 'http://the-internet.herokuapp.com/key_presses'
@driver.find_element(class: 'example').send_keys :space

# send to the current element in focus
@driver.action.send_keys(:tab).perform
```

For more info:

+ [Selenium's Action Builder `send_keys` documentation](https://seleniumhq.github.io/selenium/docs/api/rb/Selenium/WebDriver/ActionBuilder.html#send_keys-instance_method)
+ [A list of available keyboard keys and their trigger values](https://github.com/SeleniumHQ/selenium/blob/master/rb/lib/selenium/webdriver/common/keys.rb)
+ [Tip 61 on Elemental Selenium](http://elementalselenium.com/tips/61-keyboard-keys)

