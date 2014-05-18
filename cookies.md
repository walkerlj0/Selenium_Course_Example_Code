# Cookies

## Retrieve Individual Cookie
`cookie = driver.manage.cookie_named 'CookieName'`

## Add
`driver.manage.add_cookie(name: 'key', value: 'value')`

## Delete
```ruby
# one cookie
driver.manage.delete_cookie('CookieName')

# all cookies
driver.manage.delete_all_cookies
# does not delete third-party cookies, just the ones for the domain Selenium is visiting
```
