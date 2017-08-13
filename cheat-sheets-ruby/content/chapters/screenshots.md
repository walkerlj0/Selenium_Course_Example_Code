# Screenshots

## Simple screenshot

```ruby
driver.save_screenshot 'screenshot.png'
```

## Uniquely named screenshot by timestamp

```ruby
driver.save_screenshot "./#{Time.now.strftime("failshot__%d_%m_%Y__%H_%M_%S")}.png"
```

For more info:

+ [strftime reference and sandbox](http://strfti.me/)
+ [Tip 16 on Elemental Selenium](http://elementalselenium.com/tips/16-take-screenshot-on-failure)

