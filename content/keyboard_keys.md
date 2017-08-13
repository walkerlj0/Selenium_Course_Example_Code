# Keyboard Keys

Option 1:

1. Find a target element
2. Send keys to that element

```java
driver.findElement(By.id("content")).sendKeys(Keys.SPACE);
```

Option 2:

1. Use the [Selenium Action Builder](https://seleniumhq.github.io/selenium/docs/api/java/org/openqa/selenium/interactions/Action.html) to send keys to the element currently in focus

```java
Actions builder = new Actions(driver);
builder.sendKeys(Keys.LEFT).build().perform();
```
