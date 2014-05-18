# Common Actions

## Lookup an element

### the first one it finds
`driver.find_element(locator)`

### all instances of
```ruby
driver.find_elements(locator)
# returns an Array
```

## Working with found elements

```ruby
# Chain actions together
driver.find_element(locator).click

# Store the element
element = driver.find_element(locator)
element.click
```

For brevity, the latter option will be used for reference.

## Perform an action
```ruby
element.click
element.clear       # clearing an input field of its text
element.send_keys   # typing into an input field
```

## Ask a question
```ruby
element.displayed?` # is it visible?
element.enabled?`   # can it be selected?
element.selected?`  # is it selected?
```

## Retrieve information
`element.attribute(attribute_type)`  
`element.text`  

## Working with a collection of elements

```ruby
collection = driver.find_elements(locator)

# by name
collection.first.click
collection.last.click

# by index
collection[0].click
collection[-1].click
```
