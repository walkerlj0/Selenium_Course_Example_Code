# Cookies

## Retrieve Individual Cookie

```ruby
cookie = driver.manage.cookie_named 'CookieName'
```

## Add
```ruby
driver.manage.add_cookie(name: 'key', value: 'value')
```

## Delete

```ruby
# Delete a single cookie
driver.manage.delete_cookie('CookieName')

# Delete all cookies
driver.manage.delete_all_cookies
# Does not delete third-party cookies,
# just the ones for the domain Selenium is visiting
```

