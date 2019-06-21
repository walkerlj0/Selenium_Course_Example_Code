# How To Right-click

## The Problem

Sometimes you'll run into an app that has functionality hidden behind a right-click menu (a.k.a. a context menu). These menus tend to be system level menus that are untouchable by Selenium. So how do you test this functionality?

## A Solution

By leveraging Selenium's Action Builder (a.k.a. [ActionChains](https://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.common.action_chains) in the Selenium Python bindings) we can issue a right-click command (a.k.a. a [`context_click`](https://selenium-python.readthedocs.io/api.html#selenium.webdriver.common.action_chains.ActionChains.context_click)).

We can then select an option from the menu by traversing it with keyboard arrow keys (which we can issue with the Action Builder's [`send_keys`](https://selenium-python.readthedocs.io/api.html#selenium.webdriver.common.action_chains.ActionChains.send_keys) command).

__NOTE: For a full write-up on working with keyboard keys in Selenium, see [Chapter 14](#chapter14).__

Let's dig in with an example.

## An Example

Let's start by pulling in our requisite libraries, declare the test class, and wire up some simple `setUp` and `tearDown` methods.

```python
# filename: right_click.py
import unittest
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys


class RightClick(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def tearDown(self):
        self.driver.quit()
# ...
```

Now we're ready to write our test.

We'll use an example from [the-internet](https://github.com/tourdedave/the-internet) that will trigger a JavaScript alert when when we right-click on a specific area of the page ([link](http://the-internet.herokuapp.com/context_menu)). It will say `You selected a context menu`. We'll grab this text and use it to assert that the menu was actually triggered.

```python
# filename: right_click.py
# ...
    def test_example_1(self):
        driver = self.driver
        driver.get('http://the-internet.herokuapp.com/context_menu')
        menu_area = driver.find_element_by_id('hot-spot')
        ActionChains(driver).context_click(menu_area).perform()
        alert = driver.switch_to.alert
        assert alert.text == 'You selected a context menu'

if __name__ == "__main__":
    unittest.main()
```

## Expected Behavior

When we save this file and run it (e.g., `python3 right_click.py`) from the command-line) here is what will happen:

+ Open the browser and visit the page
+ Find and right-click the area which will render a custom context menu
+ JavaScript alert appears
+ Grab the text of the JavaScript alert
+ Assert that the text from the alert is what we expect
+ Close the browser

## Outro

Happy Testing!
