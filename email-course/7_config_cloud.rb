# filename: spec/spec_helper.rb

ENV['base_url']         ||= 'http://the-internet.herokuapp.com'
ENV['host']             = 'saucelabs'
ENV['operating_system'] ||= 'Windows XP'
ENV['browser']          ||= 'internet_explorer'
ENV['browser_version']  ||= '8'
ENV['SAUCE_USERNAME']   ||= 'your-sauce-username'
ENV['SAUCE_ACCESS_KEY'] ||= 'your-sauce-access-key'
