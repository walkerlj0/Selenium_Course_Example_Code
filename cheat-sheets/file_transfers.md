# File Transfers

## Upload

1. Find the text field for the upload form 
2. Send text to it
3. Submit the form

```ruby
driver.get 'http://the-internet.herokuapp.com/upload'
uploader = driver.find_element(id: 'file-upload')
uploader.send_keys 'path of file you want to upload'
uploader.submit
```

## Download

1. Get the download link from Selenium
2. Use a third-party HTTP library to perform a HEAD request
3. Query the headers to look at the content type and content length

```ruby
require 'selenium-webdriver'
require 'rspec-expectations'
require 'rest-client'

driver.get 'http://the-internet.herokuapp.com/download'
link = driver.find_element(css: 'a').attribute('href')
response = RestClient.head link
response.headers[:content_type].should == 'image/jpeg'
response.headers[:content_length].to_i.should > 0
```

## Download Secure Files

1. Get the download link from Selenium
2. Pull the session cookie from Selenium
2. Use a third-party HTTP library to perform a HEAD request using the session cookie
3. Query the headers to look at the content type and content length

```ruby
require 'selenium-webdriver'
require 'rspec-expectations'
require 'rest-client'

driver.get 'http://admin:admin@the-internet.herokuapp.com/download_secure'
link = driver.find_element(css: 'a').attribute('href')
driver.manage.cookie_named 'rack.session'
response = RestClient.head link, cookie: "#{cookie[:name]}=#{cookie[:value]};"
response.headers[:content_type].should == 'application/pdf'
response.headers[:content_length].to_i.should > 0
```
