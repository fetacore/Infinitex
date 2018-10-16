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
var css7 = fs.readFileSync(__dirname + '/src/static/main.css')

var worker = fs.readFileSync(__dirname + '/node_modules/pdfjs-dist/build/pdf.worker.min.js')

fs.writeFileSync(__dirname + '/src/static/style.css', css2 + css3 + css4 + css7)
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

fs.writeFileSync(__dirname + '/src/react/reactPdf/pdf.worker.min.js', worker)
