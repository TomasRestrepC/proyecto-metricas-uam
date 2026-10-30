const pages = require('../../config/pages');

// Datos simulados con valores por encima de los umbrales "deficiente"
// FCP > 3000 ms | LCP > 4000 ms | Speed Index > 5800 ms | Performance < 50
const devices = [
  { name: 'Moto G (412x823)',   w: 412,  h: 823, fcp: 6200, lcp: 8500, si: 7300, perf: 30 },
  { name: 'Desktop (1366x768)', w: 1366, h: 768, fcp: 3700, lcp: 5000, si: 6500, perf: 40 }
];

const datosDeficientes = [];
pages.forEach((p) => {
  devices.forEach((d) => {
    datosDeficientes.push({
      url: p.url,
      screenEmulation: d.name,
      timestamp: new Date().toISOString(),
      firstContentfulPaint: d.fcp,
      largestContentfulPaint: d.lcp,
      speedIndex: d.si,
      performance: d.perf,
      status: 'OK'
    });
  });
});

describe('Evidencia: métricas en estado Deficiente', () => {
  devices.forEach((d) => {
    it(`Captura del informe en ${d.name}`, () => {
      // Reemplaza el JSON real por los datos simulados SOLO durante esta prueba
      cy.intercept('GET', '**/lighthouse-metrics.json', datosDeficientes).as('metricas');

      cy.viewport(d.w, d.h);
      cy.visit('index.html');
      cy.wait('@metricas');

      cy.get('.card').should('have.length', datosDeficientes.length);
      cy.get('.tag-bad').should('have.length', datosDeficientes.length * 4); // 4 métricas por tarjeta
      cy.get('.tag-good, .tag-warning').should('not.exist');

      // Aviso para que quede claro que es una prueba de clasificación
      cy.document().then((doc) => {
        const aviso = doc.createElement('p');
        aviso.textContent = 'Prueba de clasificación con datos simulados';
        aviso.style.cssText = 'text-align:center;color:#991b1b;font-weight:bold;margin:0 0 16px';
        doc.querySelector('.container').insertBefore(aviso, doc.getElementById('metrics-container'));
      });

      cy.screenshot(`deficiente-${d.w}x${d.h}`, { capture: 'fullPage' });
    });
  });
});