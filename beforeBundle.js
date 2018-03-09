const fs = require('fs')
const path = require('path')
var compressor = require('node-minify')
var shelljs = require('shelljs')

if (process.platform == 'win32') {
  var fpresolver = '\\'
} else {
  var fpresolver = '/'
}

var css2 = fs.readFileSync(__dirname + '/node_modules/react-grid-layout/css/styles.css')
var css3 = fs.readFileSync(__dirname + '/node_modules/react-resizable/css/styles.css')
var css4 = fs.readFileSync(__dirname + '/node_modules/react-pdf/dist/Page/AnnotationLayer.css')
var css5 = fs.readFileSync(__dirname + '/src/react/assets/quill/quill.snow.css')
var css6 = fs.readFileSync(__dirname + '/src/react/assets/quill/xcode.min.css')
var css7 = fs.readFileSync(__dirname + '/src/static/main.css')

var worker = fs.readFileSync(__dirname + '/node_modules/pdfjs-dist/build/pdf.worker.min.js')
var poly = fs.readFileSync(__dirname + '/node_modules/babel-polyfill/dist/polyfill.min.js')

fs.writeFileSync(__dirname + '/src/static/style.css', css2 + css3 + css4 + css5 + css6 + css7)
compressor.minify({
  compressor: 'clean-css',
  input: __dirname + '/src/static/style.css',
  output: __dirname + '/src/static/style.min.css',
  options: {
    advanced: true,
    aggressiveMerging: true
  }
})

shelljs.cp('-R', __dirname + fpresolver + 'node_modules' + fpresolver + 'pdfjs-dist' + fpresolver + 'cmaps' + fpresolver, __dirname + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'reactPdf' + fpresolver)
shelljs.mkdir('-p', __dirname + fpresolver + 'src' + fpresolver + 'entry')

fs.readFile(__dirname + '/node_modules/brace/ext/language_tools.js', 'utf-8', (err, data) => {
  let dataXwrisSkatila = data.replace(
    'var completers = [snippetCompleter, textCompleter, keyWordCompleter];',
    'var completers = [snippetCompleter, keyWordCompleter];'
  ).replace(
    '#fbfbfb', '#f7f7f7'
  ).replace(
    '#444', '#383838'
  ).replace(
    'rgba(194, 193, 208, 0.09)', '#adadad'
  ).replace(
    '#CAD6FA', '#adadad'
  ).replace(
    'rgba(233,233,253,0.4)', '#adadad'
  ).replace(
    'lightgray', 'black'
  )
  fs.writeFileSync(__dirname + '/node_modules/brace/ext/language_tools.js', dataXwrisSkatila)
})

// fs.readFile(__dirname + '/node_modules/brace/mode/latex.js', 'utf-8', (err, data) => {
//   let dataXwrisSkatila = data.replace(
//     '\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/mode/text_highlight_rules\"',
//     '\"require",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/lang\",\"ace/mode/text_highlight_rules\"'
//   ).replace(
//     'var oop = acequire(\"../lib/oop\");\nvar TextHighlightRules = acequire(\"./text_highlight_rules\").TextHighlightRules;',
//     'var oop = acequire(\"../lib/oop\");\nvar lang = acequire(\"../lib/lang\");\nvar TextHighlightRules = acequire(\"./text_highlight_rules\").TextHighlightRules;'
//   ).replace(
//     'var LatexHighlightRules = function() {',
//     'var LatexHighlightRules = function(textClass) {\n\n\tif (!textClass)\n  textClass = \"text\";'
//   )
//   fs.writeFileSync(__dirname + '/node_modules/brace/mode/latex.js', dataXwrisSkatila)
// })

fs.readFile(__dirname + '/src/react/assets/ace/snippetsTex.js', 'utf-8', (err, data) => {
  fs.writeFileSync(__dirname + '/node_modules/brace/snippets/tex.js', data)
})

fs.writeFileSync(__dirname + '/src/react/reactPdf/pdf.worker.min.js', worker)
fs.writeFileSync(__dirname + '/src/static/polyfill.min.js', poly)
