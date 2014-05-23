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

| Approach | CSS            | XPath          | Description |
| -------- | :-------------:| --------------:|------------:|
| asfd     | asdf           | asdf           | asdf        |

## ID

```html
<input id="username">
```

```ruby
driver.find_element(id: 'username')
```

## Class

```html
<div>
  <span class="dues">
</div>
```

```ruby
driver.find_element(class: 'dues')
```

## CSS Selectors

### ID

### Class

### Classes

### Direct Child

### Child (or subchild)

### Next sibling

### Attribute values

### Dynamic matches

### Sub-string matches

### Inner text matches

For more info:

+ [CSS vs XPath benchmarks](http://bit.ly/seleniumbenchmarks)
+ [CSS and XPath Examples](http://bit.ly/cssxpathexamples)
+ [CSS selector game](http://bit.ly/locatorgame)
+ [How to verify your locators](http://bit.ly/verifyinglocators)
