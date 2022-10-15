import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'cypress-cucumber-example',
  viewportWidth: 1280,
  viewportHeight: 1024,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  pageLoadTimeout: 30000,
  defaultCommandTimeout: 10000,
  env: {
    TAGS: 'not @ignore',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/e2e/**/*.feature',
  },
})
