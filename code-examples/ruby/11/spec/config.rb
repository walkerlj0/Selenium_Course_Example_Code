module Config
  def config
    { base_url: ENV['BASE_URL'] || 'http://the-internet.herokuapp.com' }
  end
end
