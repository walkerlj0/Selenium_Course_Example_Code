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

| Approach            | Locator                                  | Description                                               |
| ------------------: | :-------------                           | :--------------                                           |
| ID                  | `#example`                               | # denotes an ID                                           |
| Class               | `.example`                               | . denotes a Class                                         |
| Classes             | `.flash.success`                         | place a . in front of each class when there are multiple  |
| Direct Child        | `div > a`                                | will find the element within the next child element       |
| Child or subschild  | `div a`                                  | will find the element within a child element (or one if it's children) |
| Next Sibling        | `input.username + input`                 | will find the next adjacent element                       |
| Attribute values    | `form input[name='username']`            | a great alternative to id and class matches               |
| Attribute values    | `input[name='continue'][type='button']`  | can chain multiple attribute filters together             |
| Dynamic matches     | `ul#example li:nth-of-type(4)`           | will find the 4th li in a list                            |
| Dynamic matches     | `ul#example li:nth-child(4)`             | will get the 4th element only if it is an li element      |
| Dynamic matches     | `ul#example *:nth-child(4)`              | will get the 4th element regardless of type               |
| Sub-string matches  | `a[id^='beginning_']`                    | starts with (prefix)                                      |
| Sub-string matches  | `a[id$='_end']`                          | ends with (suffix)                                        |
| Sub-string matches  | `a[id*='gooey_center']`                  | contains (substring)                                      |
| Inner text matches  | `a:contains('Log Out')`                  | an alternative to substring matching                      |

__NOTE: In older browser (e.g., Internet Explorer 8) some of these locator approaches will not function (e.g., Dynamic Matches)__

For more info:

+ [CSS vs XPath benchmarks](http://bit.ly/seleniumbenchmarks)
+ [CSS and XPath Examples](http://bit.ly/cssxpathexamples)
+ [CSS selector game](http://bit.ly/locatorgame)
+ [How to verify your locators](http://bit.ly/verifyinglocators)
+ [w3schools CSS Selectors Reference](http://www.w3schools.com/cssref/css_selectors.asp)
+ [w3schools XPath Syntax Reference](http://www.w3schools.com/xpath/xpath_syntax.asp)
