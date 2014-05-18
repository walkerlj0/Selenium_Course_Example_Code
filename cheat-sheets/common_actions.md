# Common Actions

## Find an element

```ruby
# the first one found
driver.find_element(locator)

# all instances of the element
driver.find_elements(locator)
# returns an Array
```

## Work with found elements

```ruby
# Chain actions together
driver.find_element(locator).click

# Store the element
element = driver.find_element(locator)
element.click
```


## Perform an action
```ruby
element.click
element.submit      # submits a form
element.clear       # clearing an input field of its text
element.send_keys   # typing into an input field
```

## Ask a question
```ruby
element.displayed? # is it visible?
element.enabled?   # can it be selected?
element.selected?  # is it selected?
```

## Retrieve information

```ruby
# by attribute name
element.attribute('href')

# directly from an element
element.text
```

For more info:
+ [the `attribute` documentation](http://selenium.googlecode.com/git/docs/api/rb/Selenium/WebDriver/Element.html#attribute-instance_method)

## Work with a collection of elements
```ruby
collection = driver.find_elements(locator)

# by name
collection.first.click
collection.last.click

# by index
collection[0].click
collection[-1].click
```
