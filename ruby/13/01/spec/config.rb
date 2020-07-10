module Config
  def config
    {
      base_url:         ENV['BASE_URL']         || 'http://the-internet.herokuapp.com',
      host:             ENV['HOST']             || 'saucelabs',
      browser_name:     ENV['BROWSER_NAME']     || 'internet_explorer',
      browser_version:  ENV['BROWSER_VERSION']  || '11',
      platform_name:    ENV['PLATFORM_NAME']    || 'Windows 10',
      sauce_username:   ENV['SAUCE_USERNAME'],
      sauce_access_key: ENV['SAUCE_ACCESS_KEY']
    }
  end
end
