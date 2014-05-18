# Waiting

## Implicit Wait

`driver.manage.timeouts.implicit_wait = 3`

## Explicit Waits

`Selenium::WebDriver::Wait.new(timeout: seconds).until { yield }`
