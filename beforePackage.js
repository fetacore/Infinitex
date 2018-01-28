const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');

function copyPasteStuff() {
  shelljs.cp('-R', __dirname+'/src/', __dirname+'/dist/')
  // shelljs.cp(__dirname+'/.compilerc', __dirname+'/dist/')
  shelljs.cp(__dirname+'/afterMake.js', __dirname+'/dist/')
  shelljs.cp(__dirname+'/forge.config.js', __dirname+'/dist/')
  shelljs.cp(__dirname+'/package.json', __dirname+'/dist/')
  shelljs.cp(__dirname+'/yarn.lock', __dirname+'/dist/')
  removeStuff()
}

function removeStuff() {
  shelljs.rm('-rf',
    __dirname+'/dist/src/entry/',
    __dirname+'/dist/src/entryDev.js',
    __dirname+'/dist/src/react/assets/ace/',
    __dirname+'/dist/src/react/assets/texstarters/',
    __dirname+'/dist/src/react/reactPdf/entry.js',
    __dirname+'/dist/src/react/reactKatex/',
    __dirname+'/dist/src/react/App.jsx',
    __dirname+'/dist/src/react/Editor.jsx',
    __dirname+'/dist/src/react/Grid.jsx',
    __dirname+'/dist/src/react/InfiniTex.jsx',
    __dirname+'/dist/src/react/InfinitrConverters.js',
    __dirname+'/dist/src/static/main.css',
    __dirname+'/dist/src/static/style.css',
    __dirname+'/dist/src/static/quill.snow.css',
  )
  removeLines()
}

function removeLines() {
  fs.readFile(__dirname+'/dist/src/index.js', 'utf-8', (err, data) => {
    if (err) {
      alert(err)
    } else {
      let indexXwrisSkata = data.replace(
        '\'use strict\';', ''
      ).replace(
        '\nimport { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain, Notification, shell ,globalShortcut } from \'electron\';', 'import { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain, Notification, shell ,globalShortcut } from \'electron\';'
      ).replace(
        'import installExtension, { REACT_DEVELOPER_TOOLS } from \'electron-devtools-installer\';', ''
      ).replace(
        '\nimport { enableLiveReload, addBypassChecker } from \'electron-compile\';', 'import { enableLiveReload, addBypassChecker } from \'electron-compile\';'
      ).replace(
        'const isDevMode = process.execPath.match(/[\\\\/]electron/);', ''
      ).replace(
        '\nif (isDevMode) {', ''
      ).replace(
        '  enableLiveReload({strategy: \'react-hmr\'});', ''
      ).replace(
        '  require(\'electron-reload\')(__dirname);}', ''
      ).replace(
        '// Open the DevTools.', ''
      ).replace(
        'if (isDevMode) {', ''
      ).replace(
        '    await installExtension(REACT_DEVELOPER_TOOLS);', ''
      ).replace(
        '    mainWindow.webContents.openDevTools();}', ''
      )
      fs.writeFileSync(__dirname+'/dist/src/index.js', indexXwrisSkata)
    }
  });
  fs.readFile(__dirname+'/dist/package.json', 'utf-8', (err, data) => {
    if (err) {
      alert(err)
    } else {
      let jsonXwrisSkata = data.replace(
        'start",', 'start"'
      ).replace(
        '"prebuild": "node ./beforeBundle.js",', ''
      ).replace(
        '"build": "NODE_ENV=production BABEL_ENV=production browserify ./src/entryDev.js -t [ babelify --presets [ env --targets [ electron ] react ] --plugins transform-async-to-generator ] --full-path=false --exclude electron --exclude shelljs -o ./src/entry/bundle.js",', ''
      ).replace(
        '"postbuild": "NODE_ENV=production uglifyjs --compress drop_console=true --mangle -- ./src/entry/bundle.js > ./src/react/inf.min.js",', ''
      ).replace(
        '"make": "node ./beforePackage.js && cd dist && yarn && electron-forge make && node ./afterMake.js"', ''
      ).replace(
        '"package": "node ./beforePackage.js && cd dist && yarn && electron-forge package",', ''
      ).replace(
        '"electron-devtools-installer": "^2.1.0",', ''
      )
      fs.writeFileSync(__dirname+'/dist/package.json', jsonXwrisSkata)
    }
  });
  fs.readFile(__dirname+'/dist/src/index.html', 'utf-8', (err, data) => {
    if (err) {
      alert(err)
    } else {
      let htmlXwrisSkata = data.replace(
        '<!-- <script src="../src/entry/bundle.js"></script> -->', ''
      ).replace(
        '<!-- <script src="entryDev.js"></script> -->', ''
      );
      fs.writeFileSync(__dirname+'/dist/src/index.html', htmlXwrisSkata)
    }
  });
}

shelljs.mkdir('-p',__dirname+'/dist/');
copyPasteStuff()
