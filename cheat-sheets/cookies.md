# Cookies

## Retrieve Individual Cookie
`cookie = driver.manage.cookie_named 'CookieName'`

## Add
`driver.manage.add_cookie(name: 'key', value: 'value')`

## Delete
```ruby
driver.manage.delete_cookie('CookieName')
driver.manage.delete_all_cookies
```
