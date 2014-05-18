# Common Actions

## Lookup an element

+ __the first one it finds__ `driver.find_element(locator)`
+ __all instances (returns an Array)__ `driver.find_elements(locator)`

You can store the element in a variable, or chain actions onto it
`element = driver.find_element(locator).click`

```ruby
element = driver.find_element(locator)
element.click
```

For brevity, the latter option will be used for reference.

## Perform an action
`element.click`  
`element.clear       # clearing an input field of its text`  
`element.send_keys   # typing into an input field`  

## Ask a question
`element.displayed?`  # is it visible?  
`element.enabled?`    # can it be selected?  
`element.selected?`   # is it selected?  

## Retrieve information
`element.attribute(attribute_type)`  
`element.text`  

## Working with a collection of elements
collection = driver.find_elements(locator)  

### by name
`collection.first.click`  
`collection.last.click`  

### by index
`collection[0].click`  
`collection[-1].click`  
