# Frames

1. Switch into the frame
2. Perform an action

## Nested Frames

```ruby
require 'selenium-webdriver'
require 'rspec-expectations'

driver.get 'http://the-internet.herokuapp.com/frames'
driver.switch_to.frame('frame-top')
driver.switch_to.frame('frame-middle')
driver.find_element(id: 'content').text.should =~ /MIDDLE/
```

## Iframes

```ruby
require 'selenium-webdriver'
require 'rspec-expectations'

driver.get 'http://the-internet.herokuapp.com/tinymce'
driver.switch_to.frame('mce_0_ifr')
  editor = @driver.find_element(id: 'tinymce')
  before_text = editor.text
  editor.clear
  editor.send_keys 'Hello World!'
  after_text = editor.text
after_text.should_not == before_text
```
