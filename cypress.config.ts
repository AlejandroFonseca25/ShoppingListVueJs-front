import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      config.video = false;
      config.screenshotOnRunFailure = false;
      return config;
    },
  },
});
