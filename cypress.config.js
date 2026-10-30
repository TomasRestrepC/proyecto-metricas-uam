const { defineConfig } = require('cypress');
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  // Graba un video por cada archivo de pruebas ejecutado.
  video: true,

  // Captura automáticamente la pantalla cuando una prueba falla.
  screenshotOnRunFailure: true,

  // Directorios donde Cypress guarda las evidencias.
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',

  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
        return launchOptions;
      });

      on('task', {
        lighthouse: lighthouse(),

        saveLighthouseResult(newResult) {
          const filePath = path.join(
            __dirname,
            'cypress',
            'fixtures',
            'lighthouse-metrics.json'
          );

          let data = [];

          // Conservamos el historial existente.
          if (fs.existsSync(filePath)) {
            try {
              const fileContent = fs.readFileSync(filePath, 'utf8');
              data = JSON.parse(fileContent);

              if (!Array.isArray(data)) {
                data = [];
              }
            } catch (error) {
              console.error(
                'No se pudo leer el historial JSON:',
                error.message
              );
              throw new Error(
                'El archivo lighthouse-metrics.json no contiene JSON válido.'
              );
            }
          }

          // Creamos la carpeta si todavía no existe.
          fs.mkdirSync(path.dirname(filePath), { recursive: true });

          // Agregamos el nuevo registro sin borrar los anteriores.
          data.push(newResult);

          fs.writeFileSync(
            filePath,
            JSON.stringify(data, null, 2),
            'utf8'
          );

          console.log(
            `Métricas guardadas. Total de registros: ${data.length}`
          );

          return null;
        }
      });

      return config;
    }
  }
});