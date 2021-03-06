require('babel-register')();

const { JSDOM } = require('jsdom');

const exposedProperties = ['window', 'navigator', 'document'];

const { document } = (new JSDOM('')).window;
global.document = document;
global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;
global.HTMLAnchorElement = window.HTMLAnchorElement;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
