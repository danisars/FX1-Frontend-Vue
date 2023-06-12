const Page = require('./page')

class SecurePage extends Page {
  get flashAlert() {
    return $('.toasted')
  }
}

module.exports = new SecurePage()
