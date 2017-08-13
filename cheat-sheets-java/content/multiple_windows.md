# Multiple Windows

Some browsers list window handles in the order opened, others alphabetically. Here's a ubiquitous approach to switching between windows:

1. Find and store the initial window handle
2. Trigger the new window to appear
3. Find all window handles and iterate through them, looking for the new window handle
4. Store the new window handle
5. Switch freely between the initial and new windows

```java
String firstWindow = driver.getWindowHandle();

driver.findElement(By.cssSelector(".example a")).click();

Set<String> allWindows = driver.getWindowHandles();

String newWindow = "";
for (String window : allWindows) {
    if (!window.equals(firstWindow)) {
        newWindow = window;
    }
}

driver.switchTo().window(firstWindow);
assertThat(driver.getTitle(), is(not(equalTo("New Window"))));
driver.switchTo().window(newWindow);
assertThat(driver.getTitle(), is(equalTo("New Window")));
```
