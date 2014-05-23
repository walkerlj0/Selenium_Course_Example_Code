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

| Approach            | Locator                               | Description                                 |
| -------------------: | :-------------                       | :--------------                             |
| ID                  | #example                              |                                             |
| Class               | .example                              |                                             |
| Classes             | .flash.success                        |                                             |
| Direct Child        | div > a                               | > denotes direct chidl relationship         |
| Child or subschild  | div a                                 | Space denotes child/subchild relationship   |
| Next Sibling        | input.username + input                |                                             |
| Attribute values    | form input[name='username']           |                                             |
| Attribute values    | input[name='continue'][type='button'] |                                             |
| Dynamic matches     |                                       |                                             |
| Dynamic matches     |                                       |                                             |
| Dynamic matches     |                                       |                                             |
| Sub-string matches  |                                       |                                             |
| Inner text matches  |                                       |                                             |

For more info:

+ [w3schools CSS Selectors Reference](http://www.w3schools.com/cssref/css_selectors.asp)
+ [w3schools XPath Syntax Reference](http://www.w3schools.com/xpath/xpath_syntax.asp)
+ [CSS vs XPath benchmarks](http://bit.ly/seleniumbenchmarks)
+ [CSS and XPath Examples](http://bit.ly/cssxpathexamples)
+ [CSS selector game](http://bit.ly/locatorgame)
+ [How to verify your locators](http://bit.ly/verifyinglocators)
