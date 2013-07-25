# Execute Script

Selenium gives the ability to run arbitrary bits of JavaScript in the context of a page. This can be useful if you want to look at different properties on the page, or, if you want to make changes to the application you are automating.  

To do this we use the `execute_script` method that is available on the driver object.

```ruby
  driver.execute_script('return 1+1;') # returns 2
```

If you wanted to modify the DOM you could simply do:  

```ruby
  driver.execute_secript("document.GetElementsByTagName('body')[0].appendChild(document.createTextNode('I <3 WebDriver'));")
```

You can also find an Element on the page by executing WebDriver via JavaScript:  

```ruby
cheese = driver.execute_script('return document.getElementById("cheese");')
```

This will also work for finding multiple elements:  

```ruby
driver.execute_script("return {'foo':'bar'};")
```

Note: WebDriver will try to coerce what is returned into teh relevant object. In the above example, the object returned will be a Dictionary.

This approach will not work for all things that are returned. For example, if you had jQuery on the page WebDriver would not be able to return that. For example:  

```ruby
  driver.execute_script('return $("#someId")') # returns JavaScriptExecutionException
```

This is because the element returned from $("#someId") is still a jQuery object and not a HTML element (as if we called document.getElemenById("someId")).
