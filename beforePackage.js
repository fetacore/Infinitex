const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');

if (process.platform == 'win32') {
  var fpresolver = '\\'
} else {
  var fpresolver = '/'
}

function copyPasteStuff() {
  shelljs.cp('-R', __dirname+fpresolver+'src'+fpresolver, __dirname+fpresolver+'prod'+fpresolver)
  shelljs.cp(__dirname+fpresolver+'package.json', __dirname+fpresolver+'prod'+fpresolver)
  shelljs.cp(__dirname+fpresolver+'yarn.lock', __dirname+fpresolver+'prod'+fpresolver)
  removeStuff()
}

function removeStuff() {
  shelljs.rm('-rf',
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'entry'+fpresolver,
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'entryDev.js',
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'react'+fpresolver+'assets'+fpresolver+'ace'+fpresolver,
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'react'+fpresolver+'assets'+fpresolver+'texstarters'+fpresolver,
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'react'+fpresolver+'reactPdf'+fpresolver+'entry.js',
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'react'+fpresolver+'reactKatex'+fpresolver,
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'react'+fpresolver+'App.jsx',
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'react'+fpresolver+'Editor.jsx',
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'react'+fpresolver+'Grid.jsx',
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'react'+fpresolver+'InfiniTex.jsx',
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'react'+fpresolver+'InfinitrConverters.js',
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'static'+fpresolver+'main.css',
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'static'+fpresolver+'style.css',
    __dirname+fpresolver+'prod'+fpresolver+'src'+fpresolver+'static'+fpresolver+'quill.snow.css',
  )
  removeLines()
}

function removeLines() {
  fs.readFile(__dirname+'/prod/src/index.js', 'utf-8', (err, data) => {
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
      fs.writeFileSync(__dirname+'/prod/src/index.js', indexXwrisSkata)
    }
  });
  fs.readFile(__dirname+'/prod/src/index.html', 'utf-8', (err, data) => {
    if (err) {
      alert(err)
    } else {
      let htmlXwrisSkata = data.replace(
        '<!-- <script src="../src/entry/bundle.js"></script> -->', ''
      ).replace(
        '<!-- <script src="entryDev.js"></script> -->', ''
      );
      fs.writeFileSync(__dirname+'/prod/src/index.html', htmlXwrisSkata)
    }
  });
  fs.readFile(__dirname+'/prod/package.json', 'utf-8', (err, data) => {
    if (err) {
      alert(err)
    } else {
      let pXwrisSkata = data.replace(
        '"config": { "forge": "./forge.config.js" },', ''
      )
      fs.writeFileSync(__dirname+'/prod/package.json', pXwrisSkata)
    }
  });
}

shelljs.mkdir('-p',__dirname+fpresolver+'prod'+fpresolver);
copyPasteStuff()
