# Headless Configuration

## GhostDriver via PhantomJS

1. [Download PhantomJS](http://phantomjs.org/download.html)
2. Start up PhantomJS with WebDriver support (specifying a port to run on)
3. Point your tests at PhantomJS
4. Run your tests

```sh
phantomjs --webdriver=8001
PhantomJS is launching GhostDriver...
[INFO  - 2014-04-16T02:07:51.015Z] GhostDriver - Main - running on port 8001
```

```ruby
@driver = Selenium::WebDriver.for :remote, url: 'http://localhost:8001'
```

## Xvfb

X virtual framebuffer (Xvfb) is an in-memory display server for UNIX-like operating systems (e.g., Linux).

### Install

For Debian based systems

```sh
apt-get install xvfb firefox
```

For RedHat systems

```sh
yum install Xvfb firefox
```

### Option 1

```sh
Xvfb :99 &
export DISPLAY=:99
rspec example_spec.rb
```

This approach will keep Xvfb running in the background until it is manually stopped.

### Option 2

```sh
xvfb-run rspec example_spec.rb
```

This will start Xvfb and stop it after the test run completes.

### Option 3

Use [the headless gem](https://github.com/leonid-shevtsov/headless) to start and stop Xvfb in your test code.

```ruby
require 'headless'

# before your browser setup
@headless = Headless.new
@headless.start

# after your browser teardown
@headless.destroy
```

For more info:

+ [Wikipedia write-up on Xvfb](http://en.wikipedia.org/wiki/Xvfb)
+ [Tip 38 on Elemental Selenium](http://elementalselenium.com/tips/38-headless)
