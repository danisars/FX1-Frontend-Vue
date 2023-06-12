const HomePage = require('../pageObjects/home.page')

describe('Home Page Test Cases', () => {
  it('should have correct title', async () => {
    HomePage.open()
    await expect(browser).toHaveTitle('Show the world who you support - FX1')
  })
})
