// config/schedule.js
const cron = require('node-cron');
const { exec } = require('child_process');

// Definición de la programación de ejecuciones (Sección 5 del taller)
const schedulesConfig = [
  {
    jobName: "Evaluación Diaria Móvil",
    enabled: true,
    cronExpression: "0 6 * * *", // Todos los días a las 6:00 AM
    timezone: "America/Bogotá",
    frequency: "diaria",
    device: "mobile",
    pages: ["Oferta Academica", "Grupos De Investigacion", "Noticias"]
  },
  {
    jobName: "Evaluación Semanal Escritorio",
    enabled: true,
    cronExpression: "0 7 * * 1", // Todos los lunes a las 7:00 AM
    timezone: "America/Bogotá",
    frequency: "semanal",
    device: "desktop",
    pages: ["Oferta Academica", "Grupos De Investigacion", "Noticias"]
  }
];

function initScheduler() {
  console.log("🕒 Inicializando programador de tareas (Scheduler) para la UAM...");

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

    console.log(`✔ Job programado con éxito: "${job.jobName}" -> Expresión: ${job.cronExpression} (${job.timezone})`);
  });
}

// Si se ejecuta directamente con node config/schedule.js
if (require.main === module) {
  initScheduler();
}

module.exports = { schedulesConfig, initScheduler };