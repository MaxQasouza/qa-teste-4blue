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
    setupNodeEvents(on, config) {}
  }
})
