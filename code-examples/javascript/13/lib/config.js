module.exports = {
  baseUrl: process.env.BASE_URL || 'http://the-internet.herokuapp.com',
  browser: process.env.BROWSER || 'firefox',
  viewportSize: { width: 1024, height: 768 } || {
    width: process.env.WIDTH,
    height: process.env.HEIGHT,
  },
}
