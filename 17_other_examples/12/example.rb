# Encoding: utf-8

require 'selenium-webdriver'
require 'rspec-expectations'

def setup
  @driver = Selenium::WebDriver.for :firefox
end

def teardown
  @driver.quit
end

def run
  setup
  yield
  teardown
end

run do
  @driver.get 'http://the-internet.herokuapp.com/tables'

  # sort DUES ascending
  @driver.find_element(css: '#table1 thead tr th:nth-of-type(4)').click

  # get DUES
  dues = @driver.find_elements(css: '#table1 tbody tr td:nth-of-type(4)')
  due_values = []
  dues.each { |due| due_values << due.text.gsub(/\$/,'').to_f }

  # assert DUES are ascending
  (due_values == due_values.sort).should == true

  # sort DUES descending
  @driver.find_element(css: '#table1 thead tr th:nth-of-type(4)').click

  # get DUES
  dues = @driver.find_elements(css: '#table1 tbody tr td:nth-of-type(4)')
  due_values = []
  dues.each { |due| due_values << due.text.gsub(/\$/,'').to_i }

  # assert DUES are desending
  (due_values == due_values.sort).should == false

  # sort EMAIL ascending
  @driver.find_element(css: '#table1 thead tr th:nth-of-type(3)').click

  # get EMAIL values
  emails = @driver.find_elements(css: '#table1 tbody tr td:nth-of-type(3)')
  email_values = []
  emails.each { |email| email_values << email.text }

  # assert EMAIL is ascending
  (email_values == email_values.sort).should == true
end

run do
  #@driver.get 'http://the-internet:4567/tables'
  @driver.get 'http://the-internet.herokuapp.com/tables'
  @driver.find_element(css: '#table2 thead .dues').click
  dues = @driver.find_elements(css: '#table2 tbody .dues')
  due_values = []
  dues.each { |due| due_values << due.text.gsub(/\$/,'').to_f }
  (due_values == due_values.sort).should == true
end
