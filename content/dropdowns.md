# Dropdown Lists

1. Find the dropdown list
2. Pass it into the Selenium Select helper function
3. Select from the list by its text or value

```ruby
require 'selenium-webdriver'

driver.get 'http://the-internet.herokuapp.com/dropdown'
dropdown = @driver.find_element(id: 'dropdown')
select_list = Selenium::WebDriver::Support::Select.new(dropdown)
select_list.select_by(text: "Option 1")
# select_list.select_by(value: "1")
```
