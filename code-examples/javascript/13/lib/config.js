module.exports = {
  baseUrl: process.env.BASE_URL || 'http://the-internet.herokuapp.com',
  browser: process.env.BROWSER || 'firefox',
  viewportWidth: Math.floor(process.env.VIEWPORT_WIDTH) || 1024,
  viewportHeight: Math.floor(process.env.VIEWPORT_HEIGHT) || 768,
}
