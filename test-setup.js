// test-setup.js - Configuración del entorno de pruebas
// Simular DOM con jsdom
try {
  const jsdom = window.jsdom || require('jsdom');
  const { JSDOM } = jsdom;

  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: true,
  });

  global.window = dom.window;
  global.document = dom.window.document;
  global.navigator = dom.window.navigator;
  global.HTMLElement = dom.window.HTMLElement;
  global.Event = dom.window.Event;
} catch (e) {
  // jsdom ya está configurado por Karma o el navegador
  console.log('DOM environment already configured');
}
