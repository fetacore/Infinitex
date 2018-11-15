const fs = require('fs')
const path = require('path')
const shelljs = require('shelljs')
var compressor = require('node-minify')

if (process.platform == 'win32') {
  var fpresolver = '\\'
} else {
  var fpresolver = '/'
}

function removeStuff () {
  shelljs.rm('-rf',
    __dirname + fpresolver + 'src' + fpresolver + 'entry' + fpresolver,
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'entry' + fpresolver,
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'entryDev.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'chaos.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'language_tools.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'light.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'searchbox.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'snippetsTex.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'tex.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'texstarters' + fpresolver,
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'App.jsx',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'Grid.jsx',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'InfiniTex.jsx',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'InfinitrConverters.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'static' + fpresolver + 'main.css',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'static' + fpresolver + 'style.css'
  )
}

function removeLines () {
  fs.readFile(__dirname + '/prod/src/index.js', 'utf-8', (err, data) => {
    if (err) {
      alert(err)
    } else {
      let indexXwrisSkata = data.replace(
        '\nif (isDevMode) {', ''
      ).replace(
        'require(\'electron-reload\')(__dirname)}', ''
      ).replace(
        'file://${__dirname}/index.html', 'file://${__dirname}/index.min.html'
      ).replace(
        '// Open the DevTools.', ''
      ).replace(
        'if (isDevMode) {', ''
      ).replace(
        'mainWindow.webContents.openDevTools()}', ''
      ).replace(
        '// devTools', 'devTools'
      )
      fs.writeFileSync(__dirname + '/prod/src/index.js', indexXwrisSkata)
      compressor.minify({
        compressor: 'uglify-es',
        input: __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'index.js',
        output: __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'index.min.js',
        options: {
          warnings: true, // pass true to display compressor warnings.
          mangle: true, // pass false to skip mangling names.
          compress: true
        }
      })
      fs.unlinkSync(__dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'index.js')
    }
  })
  fs.readFile(__dirname + '/prod/src/index.html', 'utf-8', (err, data) => {
    if (err) {
      alert(err)
    } else {
      let htmlXwrisSkata = data.replace(
        '<!-- <script src=\"./react/inf.min.js\"></script> -->', '<script src=\"./react/inf.min.js\"></script>'
      ).replace(
        '<script src=\"entryDev.js\"></script>', ''
      )
      fs.writeFileSync(__dirname + '/prod/src/index.html', htmlXwrisSkata)
      compressor.minify({
        compressor: 'html-minifier',
        input: __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'index.html',
        output: __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'index.min.html'
      })
      fs.unlinkSync(__dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'index.html')
    }
  })
  fs.readFile(__dirname + '/prod/package.json', 'utf-8', (err, data) => {
    if (err) {
      alert(err)
    } else {
      let packXwrisSkata = data.replace(
        '\"electron-prebuilt-compile\": \"^3.0.6\"', '\"electron\": \"^4.0.0-beta.7\"'
      ).replace(
        '\"src/index.js\"', '\"src/index.min.js\"'
      )
      fs.writeFileSync(__dirname + '/prod/package.json', packXwrisSkata)
    }
  })
  removeStuff();
}

function copyPasteStuff () {
  shelljs.cp('-R', __dirname + fpresolver + 'src' + fpresolver, __dirname + fpresolver + 'prod' + fpresolver)
  shelljs.cp(__dirname + fpresolver + 'package.json', __dirname + fpresolver + 'prod' + fpresolver)
  shelljs.cp(__dirname + fpresolver + 'yarn.lock', __dirname + fpresolver + 'prod' + fpresolver)
  removeLines()
}

shelljs.mkdir('-p', __dirname + fpresolver + 'prod' + fpresolver)
copyPasteStuff()
