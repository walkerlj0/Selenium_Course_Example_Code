require 'selenium-webdriver'
require 'rspec-expectations'

def setup
  @download_dir = "/Users/more/Desktop/tmp/#{Time.now.strftime("%m%d%y_%H%M%S")}"
  profile = Selenium::WebDriver::Firefox::Profile.new
  profile['browser.download.folderList'] = 2 # the last folder specified for download
  profile['browser.download.dir'] = @download_dir
  profile['browser.helperApps.neverAsk.saveToDisk'] = 'image/jpeg, application/pdf'
  profile['pdfjs.disabled'] = true #need to set with PDFs

  #In Chrome
  #profile = Selenium::WebDriver::Chrome::Profile.new
  #profile['download.prompt_for_download'] = false
  #profile['download.default_directory'] = @download_dir
  #@driver = Selenium::WebDriver.for :chrome, :profile => profile

  @driver = Selenium::WebDriver.for :firefox, :profile => profile
end

def teardown
  @driver.quit
  system("rm -rf #{@download_dir}")
end

def run
  setup
  yield
  teardown
end

run {
  @driver.get 'http://the-internet.herokuapp.com/download'
  download_link = @driver.find_element(css: 'a')
  download_link.click

  # Click the 2nd link
  #@driver.find_elements(css: 'a')[1].click

  # Click all the links
  #download_links = @driver.find_elements(css: 'a')
  #download_links.each do |download_link|
  # download_link.attribute('href').click
  #end

  downloaded_files = Dir.glob("#{@download_dir}/**/*")
  sorted_downloads = downloaded_files.sort_by { |file| File.mtime(file) }
  File.size(sorted_downloads.last).should > 0
}
