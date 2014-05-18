## Multiple Windows

### A simple way

```ruby
driver.switch_to.window(driver.window_handles.first)
driver.switch_to.window(driver.window_handles.last)
```

Caveat: The order of the window handles is not consistent across all browsers. Some return in the order opened, others alphabetically.

### A more robust way

```ruby
main_window = @driver.window_handle
# action that triggers a new window
windows = @driver.window_handles
windows.each do |window|
  if main_window != window
    @new_window = window
  end
end
```
