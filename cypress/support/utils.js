const fs = require('fs');
const path = require('path');

function saveLighthouseResult(newResult) {
  const filePath = path.join(__dirname, '../fixtures/lighthouse-metrics.json');
  let data = [];

  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileContent);
      if (!Array.isArray(data)) {
        data = [];
      }
    } catch (e) {
      data = [];
    }
  }

  data.push(newResult);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = { saveLighthouseResult };