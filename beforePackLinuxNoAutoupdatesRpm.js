const fs = require('fs')
const path = require('path')
const shelljs = require('shelljs')

if (process.platform == 'win32') {
  var fpresolver = '\\'
} else {
  var fpresolver = '/'
}

function copyPasteStuff () {
  shelljs.cp('-R', __dirname + fpresolver + 'src' + fpresolver, __dirname + fpresolver + 'prod' + fpresolver)
  shelljs.cp(__dirname + fpresolver + 'package.json', __dirname + fpresolver + 'prod' + fpresolver)
  shelljs.cp(__dirname + fpresolver + 'yarn.lock', __dirname + fpresolver + 'prod' + fpresolver)
  removeStuff()
}

function removeStuff () {
  shelljs.rm('-rf',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'entry' + fpresolver,
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'entryDev.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'ace' + fpresolver,
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'assets' + fpresolver + 'texstarters' + fpresolver,
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'reactPdf' + fpresolver + 'entry.js',
    __dirname + fpresolver + 'prod' + fpresolver + 'src' + fpresolver + 'react' + fpresolver + 'reactKatex' + fpresolver,
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
      ).replace(
        'const { autoUpdater } = require(\'electron-updater\')', ''
      ).replace(
        'if (!isDevMode) {autoUpdater.checkForUpdates()}', ''
      ).replace(
        data.slice(
          data.indexOf('autoUpdater.on(\'update-available\''), data.indexOf('autoUpdater.quitAndInstall()})});')
        ), ''
      ).replace(
        'autoUpdater.quitAndInstall()})});', ''
      )
      fs.writeFileSync(__dirname + '/prod/src/index.js', indexXwrisSkata)
    }
  })
  fs.readFile(__dirname + '/prod/src/index.html', 'utf-8', (err, data) => {
    if (err) {
      alert(err)
    } else {
      let htmlXwrisSkata = data.replace(
        '<!-- <script src="../src/entry/bundle.js"></script> -->', ''
      ).replace(
        '<!-- <script src="entryDev.js"></script> -->', ''
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
        '\"AppImage\"', '\"rpm\"'
      ).replace(
        '\"electron-updater\": \"2.21.0\",', ''
      )
      fs.writeFileSync(__dirname + '/prod/package.json', packXwrisSkata)
    }
  })
}

shelljs.mkdir('-p', __dirname + fpresolver + 'prod' + fpresolver)
copyPasteStuff()
