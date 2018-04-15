const fs = require('fs')
const path = require('path')
const shelljs = require('shelljs')
var UglifyJS = require("uglify-es");

if (process.platform == 'win32') {
  var fpresolver = '\\'
} else {
  var fpresolver = '/'
}

var uglifyOptions = {
  ecma: 6,
  compress: {
    drop_console: true,
    passes: 2
  },
  mangle: true,
  output: {
    beautify: false,
  }
};

function copyPasteStuff () {
  shelljs.cp('-R', __dirname + fpresolver + 'src' + fpresolver, __dirname + fpresolver + 'prod' + fpresolver)
  shelljs.cp(__dirname + fpresolver + 'package.json', __dirname + fpresolver + 'prod' + fpresolver)
  shelljs.cp(__dirname + fpresolver + 'yarn.lock', __dirname + fpresolver + 'prod' + fpresolver)
  removeStuff()
}

function removeStuff () {
  shelljs.rm('-rf',
    __dirname + fpresolver + 'src' + fpresolver + 'entry' + fpresolver,
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'entry' + fpresolver,
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'entryDev.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'chaos.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'green.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'language_tools.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'light.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'purple.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'red.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'searchbox.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'snippetsTex.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver + 'tex.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'texstarters' + fpresolver,
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'App.jsx',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'Editor.jsx',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'Grid.jsx',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'InfiniTex.jsx',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'InfinitrConverters.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'static' + fpresolver + 'main.css',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'static' + fpresolver + 'style.css',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets'+ fpresolver + 'quill' + fpresolver + 'quill.snow.css',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets'+ fpresolver + 'quill' + fpresolver + 'xcode.min.css'
  )
  removeLines()
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
        '// Open the DevTools.', ''
      ).replace(
        'if (isDevMode) {', ''
      ).replace(
        'mainWindow.webContents.openDevTools()}', ''
      ).replace(
        '// devTools', 'devTools'
      )
      fs.writeFileSync(__dirname + '/prod/src/index.js', indexXwrisSkata)
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
    }
  })
  fs.readFile(__dirname + '/prod/package.json', 'utf-8', (err, data) => {
    if (err) {
      alert(err)
    } else {
      let packXwrisSkata = data.replace(
        'electron-prebuilt-compile', 'electron'
      ).replace(
        '2.0.0-beta.5', '2.0.0-beta.7'
      ).replace(
        '\"src/index.js\"', '\"src/index.min.js\"'
      ).replace(
        '\"uglify-js\": \"^3.3.13\"', '\"uglify-es\": \"^3.3.9\"'
      )
      fs.writeFileSync(__dirname + '/prod/package.json', packXwrisSkata)
    }
  })
  fixIndex()
}

function fixIndex () {
  fs.readFile(__dirname + '/prod/src/index.js', 'utf-8', (err, data) => {
    if (err) {
      alert(err)
    } else {
      let mini = UglifyJS.minify(data, uglifyOptions);
      fs.writeFile(__dirname + '/prod/src/index.min.js', mini.code, (err) => {
        if (err) {
          alert(err)
        } else {
          shelljs.rm('-rf',
            __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'index.js'
          )
        }
      })

    }
  })
}

shelljs.mkdir('-p', __dirname + fpresolver + 'prod' + fpresolver)
copyPasteStuff()
