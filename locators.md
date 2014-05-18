# Locators

Good locators are:
+ unique
+ descriptive
+ unlikely to change

1. Start with IDs and Classes
2. Use CSS (or XPath) for hard to reach places
3. If stuck, talk with a Developer to update the markup on the page for simpler automation

## CSS

### Id

Prepended with a `#`
`driver.find_element(css: '#example')`

### Class

Prepended with a `.`
`driver.find_element(css: '.example')`

### Direct Child

The next adjacent element
`driver.find_element(css: 'form input.username + input')

### Child or Subchild
### Next Sibling
### Attribute Values
### Dynamic Matches
### Sub-string Matches

For more info:
+ http://saucelabs.com/resources/selenium/css-selectors
+ http://bit.ly/locatorgame
+ http://bit.ly/verifyinglocators
+ http://elementalselenium.com/tips/category/benchmarks
