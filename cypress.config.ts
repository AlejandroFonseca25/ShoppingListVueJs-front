import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    numTestsKeptInMemory: 0,
    setupNodeEvents(on, config) {
      config.video = false;
      config.screenshotOnRunFailure = false;
      return config;
    },
  },
});
