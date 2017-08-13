# Dropdowns

1. Find the dropdown list
2. Select the item you want from the list by either it's visible text or value number

```java
driver.get("http://the-internet.herokuapp.com/dropdown");
Select selectList = new Select(driver.findElement(By.id("dropdown")));
selectList.selectByVisibleText("Option 1");
selectList.selectByValue("1");
```
