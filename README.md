# Proyecto: Automatización de Métricas Web - UAM

Solución automatizada desarrollada para la **Universidad Autónoma de Manizales** orientada a evaluar el rendimiento de páginas institucionales utilizando **Cypress** y **Google Lighthouse**, con almacenamiento en historial JSON, planificador de tareas y un informe web visual con clasificación de umbrales.

## Integrantes y Páginas Evaluadas
* **Integrante 1:** Oferta Académica  
  `https://www.autonoma.edu.co/oferta-academica`
* **Integrante 2:** Grupos de Investigación  
  `https://www.autonoma.edu.co/investigacion-innovacion-y-emprendimiento/grupos-de-investigacion`
* **Integrante 3:** Noticias / Actualidad  
  `https://www.autonoma.edu.co/conoce-la-uam/noticias`

## Requisitos Técnicos Previos
* Node.js (Versión LTS recomendada)
* Git
* Navegador Google Chrome instalado

## Instalación y Configuración
1. Clona el repositorio en tu equipo local:
   ```bash
   git clone <URL_DE_TU_REPOSOTORIO>
   cd proyecto-metricas-uam
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

## Ejecución de Pruebas
Para ejecutar la recolección de métricas con Cypress y Lighthouse en los perfiles móvil y escritorio:
```bash
npx cypress run --browser chrome --spec "cypress/e2e/performance.cy.js"
```

## Programación de Ejecuciones (Scheduler)
Para iniciar el planificador de ejecuciones programadas con `node-cron` ajustado a la zona horaria `America/Bogotá`:
```bash
node config/schedule.js
```

## Informe Web Visual
Abre el archivo `index.html` directamente en tu navegador web o utiliza una extensión como **Live Server** en VS Code para explorar las métricas, las comparaciones por dispositivo y las clasificaciones visuales (*Bueno*, *Por mejorar*, *Deficiente*).