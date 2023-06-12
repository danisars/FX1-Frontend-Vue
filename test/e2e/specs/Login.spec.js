const LoginPage = require('../pageObjects/login.page')

describe('Login Test Cases', () => {
  it('should login with valid credentials', async () => {
    LoginPage.open()
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Send Keys
    await LoginPage.IEmail.setValue('testbot231@gmail.com')
    await new Promise(resolve => setTimeout(resolve, 1000))
    await LoginPage.IPassword.setValue('Test@dmin231')
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Submit
    await LoginPage.BSubmit.click()

    // Check Navigation
    await expect(browser).toHaveTitle('Explore to find your sporting league or club - FX1')
  })
})
