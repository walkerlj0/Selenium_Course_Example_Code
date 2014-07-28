require 'sauce_whisk'

ENV['base_url']         ||= 'http://the-internet.herokuapp.com'
ENV['host']             = 'saucelabs'
ENV['operating_system'] ||= 'Windows XP'
ENV['browser']          ||= 'internet_explorer'
ENV['browser_version']  ||= '8'
ENV['SAUCE_USERNAME']   = 'the-internet'
ENV['SAUCE_ACCESS_KEY'] = '26bd4eac-9ef2-4cf0-a6e0-3b7736bd5359'
ENV['tunnel']           ||= ''

unless ENV['tunnel'].empty?
  require 'sauce'
  Sauce::Utilities::Connect.start
  ENV['base_url']       = 'http://the-internet-local:4567'
end
