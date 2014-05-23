# Locators

## Guiding principles

Good Locators are:

+ unique
+ descriptive
+ unlikely to change

Be sure to:

1. Start with ID and Class
2. Use CSS selectors (or XPath) when you need to traverse
3. Talk with a developer on your team when the app is hard to automate
  + tell them what you're trying to automate
  + work with them to get more semantic markup added to the page

### ID 

```ruby
driver.find_element(id: 'username')
```

### Class

```ruby
driver.find_elements(class: 'dues')
```

### CSS Selectors

#### Example Usage:

```ruby
driver.find_element(css: '#example')
```

#### Locators

| Approach          | Locator                                  | Description                                                  |
| -----------------:| :-------------                           | :--------------                                              |
| ID                | `#example`                               | `#` denotes an ID                                            |
| Class             | `.example`                               | `.` denotes a Class                                          |
| Classes           | `.flash.success`                         | place a `.` in front of each class when there are multiple   |
| Direct child      | `div > a`                                | will find the element within the next child element          |
| Child/subschild   | `div a`                                  | will find the element within a child or one if it's children |
| Next sibling      | `input.username + input`                 | will find the next adjacent element                          |
| Attribute values  | `form input[name='username']`            | a great alternative to id and class matches                  |
| Attribute values  | `input[name='continue'][type='button']`  | can chain multiple attribute filters together                |
| Location          | `li:nth-of-type(4)`                      | will find the 4th li in a list                               |
| Location          | `li:nth-child(4)`                        | will get the 4th element only if it is an li element         |
| Location          | `*:nth-child(4)`                         | will get the 4th element regardless of type                  |
| Sub-string        | `a[id^='beginning_']`                    | starts with (prefix)                                         |
| Sub-string        | `a[id$='_end']`                          | ends with (suffix)                                           |
| Sub-string        | `a[id*='gooey_center']`                  | contains (substring)                                         |
| Inner text        | `a:contains('Log Out')`                  | an alternative to substring matching                         |

__NOTE: Older browser (e.g., Internet Explorer 8) don't support CSS Pseudo-classes, so some of these locator approaches won't work (e.g., Specific atches and Inner text matches)__

For more info:

+ [CSS vs XPath benchmarks](http://bit.ly/seleniumbenchmarks)
+ [CSS and XPath Examples](http://bit.ly/cssxpathexamples)
+ [CSS selector game](http://bit.ly/locatorgame)
+ [How to verify your locators](http://bit.ly/verifyinglocators)
+ [w3schools CSS Selectors Reference](http://www.w3schools.com/cssref/css_selectors.asp)
+ [w3schools XPath Syntax Reference](http://www.w3schools.com/xpath/xpath_syntax.asp)
