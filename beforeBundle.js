const fs = require('fs');
const path = require('path');
var compressor = require('node-minify');
var shelljs = require('shelljs');

var css2 = fs.readFileSync(__dirname+'/node_modules/react-grid-layout/css/styles.css');
var css3 = fs.readFileSync(__dirname+'/node_modules/react-resizable/css/styles.css');
var css4 = fs.readFileSync(__dirname+'/node_modules/react-pdf/dist/Page/AnnotationLayer.css');
var css5 = fs.readFileSync(__dirname+'/src/react/assets/quill/quill.snow.css');
var css6 = fs.readFileSync(__dirname+'/src/react/assets/quill/xcode.min.css');
var css7 = fs.readFileSync(__dirname+'/src/static/main.css');

var worker = fs.readFileSync(__dirname+'/node_modules/pdfjs-dist/build/pdf.worker.min.js');
var poly = fs.readFileSync(__dirname+'/node_modules/babel-polyfill/dist/polyfill.min.js');

fs.writeFileSync(__dirname+'/src/static/style.css', css2+css3+css4+css5+css6+css7);
compressor.minify({
  compressor: 'clean-css',
  input: __dirname+'/src/static/style.css',
  output: __dirname+'/src/static/style.min.css',
  options: {
    advanced: true,
    aggressiveMerging: false,
  },
});

shelljs.cp('-R', __dirname+'/node_modules/pdfjs-dist/cmaps/', __dirname+'/src/react/reactPdf/')
shelljs.mkdir('-p', __dirname+'/src/entry');

// fs.readFile(__dirname+'/node_modules/react-pdf/build/PageAnnotations.js', 'utf-8', (err, data) => {
//   let dataXwrisSkatila = data.replace("require('./annotation_layer_builder.css');", '');
//   fs.writeFileSync(__dirname+'/node_modules/react-pdf/build/PageAnnotations.js', dataXwrisSkatila);
// });
fs.readFile(__dirname+'/node_modules/brace/ext/language_tools.js', 'utf-8', (err, data) => {
  let dataXwrisSkatila = data.replace('var completers = [snippetCompleter, textCompleter, keyWordCompleter];', 'var completers = [snippetCompleter, keyWordCompleter];')
  fs.writeFileSync(__dirname+'/node_modules/brace/ext/language_tools.js', dataXwrisSkatila)
});

fs.writeFileSync(__dirname+'/src/react/reactPdf/pdf.worker.min.js', worker);
fs.writeFileSync(__dirname+'/src/static/polyfill.min.js', poly);
