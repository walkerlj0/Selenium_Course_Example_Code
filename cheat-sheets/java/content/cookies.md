# Cookies

## Retrieve a cookie

```java
driver.manage().getCookieNamed("cookieName");
```

## Add a cookie

```java
driver.manage().addCookie(new Cookie("cookieName", "cookieValue"));
```

## Delete a cookie

```java
driver.manage().deleteCookieNamed("cookieName");
```

## Delete all cookies

```java
// Only deletes cookies for the domain Selenium visits
driver.manage().deleteAllCookies();
```
