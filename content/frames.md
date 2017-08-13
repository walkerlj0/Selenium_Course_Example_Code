# Frames

In order to access elements in frames, you need to switch to them.

If the element you want is nested inside of 2 or more frames, you first need to switch to the parent frame, then the child frame.

```java
driver.switchTo().frame("frame-top");
driver.switchTo().frame("frame-middle");
```

You can quickly switch back to the top of the page with a single command, rather than traversing backwards.

```java
driver.switchTo().defaultContent();
```
