# Execute Script

Selenium gives the ability to run arbitrary bits of JavaScript in the context of the page. This can be useful if you want to look at different properties on the page or if you want to just to make changes to the application you are automating.

To do this we need to use the `execute_script` method that is available on the driver object.

```python
		driver.execute_script("return 1+1;") # returns 2
```

`execute_script` will run the tests in the context of the page. This will allow us to easily reference the `document` object on the page. If you wanted to modify the DOM you could simply do:

```python
		driver.execute_script("document.getElementsByTagName('body')[0].appendChild(document.createTextNode('I <3 WebDriver'));")
```

WebDriver allows you to find an Element on the page by executing JavaScript. We do this by executing the normal code to find an element in the DOM with JavaScript. See below.

```python
	cheese = driver.execute_script('return document.getElementById("cheese");')
```

This will also work for finding multiple elements. WebDriver will try coerce what is returned into the relevant object. For example if you did `driver.execute_script("return {'foo':'bar'};")` the object returned will be a Dictionary.

This will not work for all things that are returned. For example if you had jQuery on the page it we would not be able to return that. This includes just finding elements. For example :

```python
		driver.execute_script('return $("#someId")') # returns JavaScriptExecutionException
```

This is because the element returned from `$("#someId")` is still a jQuery object and not a html element as if we called `document.getElementById("someId")`

