module.exports = {
  fcp: { // First Contentful Paint (en milisegundos)
    good: 1800,       // < 1.8s
    needsImprovement: 3000 // 1.8s - 3.0s, > 3.0s es deficiente
  },
  lcp: { // Largest Contentful Paint (en milisegundos)
    good: 2500,       // <= 2.5s
    needsImprovement: 4000 // 2.5s - 4.0s, > 4.0s es deficiente
  },
  speedIndex: { // Speed Index (en milisegundos)
    good: 3400,       // <= 3.4s
    needsImprovement: 5800 // 3.4s - 5.8s, > 5.8s es deficiente
  },
  performance: { // Puntuación de 0 a 100
    good: 90,         // 90 - 100
    needsImprovement: 50  // 50 - 89, < 50 es deficiente
  }
};