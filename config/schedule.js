const cron = require('node-cron');
const { exec } = require('child_process');

const schedulesConfig = [
  {
    jobName: "Evaluación Periodica Móvil",
    enabled: true,
    cronExpression: "*/2 * * * *", // Ajuste de horario para pruebas frecuentes (cada 15 minutos)
    timezone: "America/Bogota",
    frequency: "periodica",
    device: "mobile",
    pages: ["Oferta Academica", "Grupos De Investigacion", "Noticias"]
  },
  {
    jobName: "Evaluación Periodica Escritorio",
    enabled: true,
    cronExpression: "*/2 * * * *", // Ajuste de horario para pruebas frecuentes (cada 15 minutos)
    timezone: "America/Bogota",
    frequency: "periodica",
    device: "desktop",
    pages: ["Oferta Academica", "Grupos De Investigacion", "Noticias"]
  }
];

function initScheduler() {
  console.log(" Inicializando programador de tareas (Scheduler) para la UAM...");

  schedulesConfig.forEach((job) => {
    if (!job.enabled) {
      console.log(`[Job Deshabilitado]: ${job.jobName}`);
      return;
    }

    cron.schedule(job.cronExpression, () => {
      console.log(`[Scheduler] Ejecutando job: ${job.jobName} (${job.frequency}) en zona horaria ${job.timezone}`);
      
      // Comando para ejecutar las pruebas automatizadas de Cypress
      const command = `npx cypress run --browser chrome --spec "cypress/e2e/performance.cy.js"`;
      
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`[Error en Job ${job.jobName}]:`, error);
          return;
        }
        console.log(`[Éxito Job ${job.jobName}]: Pruebas ejecutadas y JSON actualizado.`);
      });
    }, {
      scheduled: true,
      timezone: job.timezone
    });

    console.log(` Job programado con éxito: "${job.jobName}" -> Expresión: ${job.cronExpression} (${job.timezone})`);
  });
}

// Si se ejecuta directamente con node config/schedule.js
if (require.main === module) {
  initScheduler();
}

module.exports = { schedulesConfig, initScheduler };