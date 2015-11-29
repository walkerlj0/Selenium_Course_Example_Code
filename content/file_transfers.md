# File Transfers

## Upload

1. Find the text field for the upload form
2. Send text to it
3. Submit the form

```ruby
require 'selenium-webdriver'

driver.get 'http://the-internet.herokuapp.com/upload'
uploader = driver.find_element(id: 'file-upload')
uploader.send_keys 'path of file you want to upload'
uploader.submit
```

## Download with Firefox

1. Create a Selenium profile configuration object
2. Specify the download method that enables specifying a path
3. Specify a folder path to download files to
4. Specify the MIME type of the files you want to download
5. Disable the Firefox PDF viewer (if downloading PDF files)
6. Load the profile configuration object when creating an instance of Selenium

```ruby
profile = Selenium::WebDriver::Firefox::Profile.new
profile['browser.download.folderList'] = 2
profile['browser.download.dir'] = 'path to download dir' 
profile['browser.helperApps.neverAsk.saveToDisk'] = 'image/jpeg, application/pdf'
profile['pdfjs.disabled'] = true

@driver = Selenium::WebDriver.for :firefox, profile: profile
```

For more info:

+ [A list of MIME types](http://www.webmaster-toolkit.com/mime-types.shtml)
+ [A list of all of Firefox's available preferences](http://preferential.mozdev.org/preferences.html)
+ [Tip 2 on Elemental Selenium](http://elementalselenium.com/tips/2-download-a-file)

## Download with an HTTP Library

1. Get the download link from Selenium
2. Use a third-party HTTP library to perform a HEAD request
3. Query the headers to look at the content type and content length

```ruby
require 'selenium-webdriver'
require 'rspec/expectations'
require 'rest-client'

driver.get 'http://the-internet.herokuapp.com/download'
link = driver.find_element(css: 'a').attribute('href')
response = RestClient.head link
expect(response.headers[:content_type]).to eql 'image/jpeg'
expect(response.headers[:content_length].to_i).to > 0
```

## Download Secure Files with an HTTP Library

1. Get the download link from Selenium
2. Pull the session cookie from Selenium
2. Use a third-party HTTP library to perform a HEAD request using the session cookie
3. Query the headers to look at the content type and content length

```ruby
require 'selenium-webdriver'
require 'rspec/expectations'
require 'rest-client'

driver.get 'http://admin:admin@the-internet.herokuapp.com/download_secure'
link = driver.find_element(css: 'a').attribute('href')
driver.manage.cookie_named 'rack.session'
response = RestClient.head link, cookie: "#{cookie[:name]}=#{cookie[:value]};"
expect(response.headers[:content_type]).to eql 'image/jpeg'
expect(response.headers[:content_length].to_i).to > 0
```
