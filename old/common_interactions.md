# Common Interactions

Selenium drives a browser by finding elements visible in the browser and taking actions against them. The most common actions are navigating to a page, finding an element, inputting text, clicking, and getting text.

## Navigate to a page

```ruby
driver.get 'http://www.google.com'
```

## Find

```ruby
driver.find_element # returns the first matching item it finds
```

```ruby
driver.find_elements # returns a collection of all matching items it finds
```

Note: There are various locator strategies you can use to find an element. See our *Locators Cheet Sheet* for more info.  

## Inputting Text

```ruby
driver.find_element(id: 'gbqfq').clear
driver.find_element(id: 'gbqfq').send_keys 'elemental selenium tips'
```

Inputs text into the element specified. In some cases, you may need to clear the element before inputting text.  

## Click

```ruby
driver.find_element(id: 'gbqfb').click
```

Note: Selenium will only wait as long as you tell it to. See our *Waiting Cheat Sheet* for more info.  

## Get Text

```ruby
driver.find_element(css: '#rso .g').text
```

Gets the text of the element. Useful for performing an assertion against.  
