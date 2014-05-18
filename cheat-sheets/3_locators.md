# Locators

Good locators are:
+ unique
+ descriptive
+ unlikely to change

## ID
`driver.find_element(id: 'element')`

## Class
`driver.find_element(class: 'element')`

For hard to reach places, use CSS Selectors

## Direct Child
`driver.find_element(css: 'div > a')`

## Child or subchild
`driver.find_element(css: 'div a')

## Next sibling
`
## Attribute values
## Dynamic matches
## Sub-string matches
## Matching by inner-text
