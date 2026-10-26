const { defineConfig } = require("cypress");
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(),
        saveLighthouseResult(newResult) {
          const filePath = path.join(__dirname, 'cypress/fixtures/lighthouse-metrics.json');
          let data = [];

          if (fs.existsSync(filePath)) {
            try {
              const fileContent = fs.readFileSync(filePath, 'utf8');
              data = JSON.parse(fileContent);
              if (!Array.isArray(data)) data = [];
            } catch (e) {
              data = [];
            }
          }

          data.push(newResult);
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
          return null;
        }
      });
    },
  },
});