const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qa-play-sim.lovable.app',
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-site-isolation-trials')
          launchOptions.args.push('--disable-web-security')
          launchOptions.args.push('--allow-running-insecure-content')
          launchOptions.args.push('--ignore-certificate-errors')
        }
        return launchOptions
      })
    }
  }
})
