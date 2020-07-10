module Config
  def config
    {
      base_url:     ENV['BASE_URL']     || 'http://the-internet.herokuapp.com',
      browser_name: ENV['BROWSER_NAME'] || 'firefox'
    }
  end
end
