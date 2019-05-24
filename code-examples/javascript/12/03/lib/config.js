module.exports = {
  baseUrl: process.env.BASE_URL || 'http://the-internet.herokuapp.com',
  viewportSize: { width: 1024, height: 768 } || {
    width: process.env.WIDTH,
    height: process.env.HEIGHT,
  },
}
