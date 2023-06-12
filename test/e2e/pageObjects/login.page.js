const Page = require('./page')

class LoginPage extends Page {

  get IEmail() {
    return $('#IEmail')
  }

  get IPassword() {
    return $('#IPassword')
  }

  get BSubmit() {
    return $('#BSubmit')
  }

  // login(username , password) {
  //   // username = testbot231@gmail.com
  //   // password = Test@dmin231
  // }

  open() {
    super.open('/signin')
  }
}

module.exports = new LoginPage()
