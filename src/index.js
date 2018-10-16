const {
  app,
  BrowserWindow,
  nativeImage,
  ipcMain,
  Notification,
  shell,
  globalShortcut,
  dialog,
  Tray,
  Menu
} = require('electron')
const { addBypassChecker } = require('electron-compile')
const { autoUpdater } = require('electron-updater')
const fs = require('fs')
const path = require('path')

const isDevMode = process.execPath.match(/[\\/]electron/);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let notification
let tray
let trayContextMenu

const registerShortcuts = async () => {
  globalShortcut.register('CommandOrControl+O', (event) => {
    mainWindow.webContents.send('Open Project', true)
  })

  globalShortcut.register('CommandOrControl+S', (event) => {
    mainWindow.webContents.send('Save Project', true)
  })

  globalShortcut.register('CommandOrControl+Q', (event) => {
    mainWindow.webContents.send('Close Project', true)
  })

  globalShortcut.register('CommandOrControl+Enter', (event) => {
    mainWindow.webContents.send('Run Compilation', true)
  })

  globalShortcut.register('CommandOrControl+Shift+R', (event) => {
    mainWindow.reload()
  })
}

const unregisterShortcuts = async () => {
  globalShortcut.unregister('CommandOrControl+O', (event) => {
    mainWindow.webContents.send('Open Project', true)
  })

  globalShortcut.unregister('CommandOrControl+S', (event) => {
    mainWindow.webContents.send('Save Project', true)
  })

  globalShortcut.unregister('CommandOrControl+Q', (event) => {
    mainWindow.webContents.send('Close Project', true)
  })

  globalShortcut.unregister('CommandOrControl+Enter', (event) => {
    mainWindow.webContents.send('Run Compilation', true)
  })

  globalShortcut.unregister('CommandOrControl+Shift+R', (event) => {
    mainWindow.reload()
  })
}

addBypassChecker((filePath) => {
  // return filePath.indexOf(app.getAppPath()) === -1 && (/.pdf/.test(filePath))
  return /.pdf/.test(filePath)
})

if (isDevMode) {
  require('electron-reload')(__dirname)}

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    defaultFontSize: 12,
    backgroundColor: '#111',
    icon: nativeImage.createFromPath(__dirname + '/static/icon.png'),
    darkTheme: true,
    show: false,
    // frame: false,
    // resizable: false,
    webPreferences: {
      // devTools: false,
      plugins: false
    }
  })
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.setMenu(null)
  mainWindow.maximize()

  // Open the DevTools.
  if (isDevMode) {
    mainWindow.webContents.openDevTools()}

  tray = new Tray(__dirname + '/static/infty_white.png')
  tray.setImage(nativeImage.createFromPath(__dirname + '/static/icon.png'))
  tray.on('click', (e) => {
    if (mainWindow.isFocused()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })
  trayContextMenu = Menu.buildFromTemplate([
    { label: 'Show', click: () => mainWindow.show() },
    { type: 'separator' },
    { label: 'Quit', click:  () => {
        app.isQuiting = true
        app.quit()
      }
    }
  ])
  tray.setToolTip('Infinitex')
  tray.setContextMenu(trayContextMenu)

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
		mainWindow.show()
		setTimeout(() => {
			mainWindow.focus()
		}, 10)
  });

  mainWindow.on('focus', registerShortcuts)
  mainWindow.on('blur', unregisterShortcuts)
  if (!isDevMode) {autoUpdater.checkForUpdates()}
  if (process.platform == 'win32') {
    app.setAppUserModelId('com.fetacore.Infinitex')
  }

  mainWindow.on('minimize', (event) => {
    event.preventDefault()
    mainWindow.minimize()
  })

  mainWindow.on('close', (event) => {
    if(!app.isQuiting){
      event.preventDefault()
      mainWindow.hide()
    }
    return false
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready',createWindow);
app.requestSingleInstanceLock();
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

autoUpdater.on('update-available', (info) => {
  notification = new Notification({
    title: 'InfiniTex',
    body: 'There exist available updates. Working on it...',
    silent: true,
    icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
  })
  notification.show()
  let trayContextMenu = Menu.buildFromTemplate([
    {label: 'Updating..'},
    { label: 'Show', click: () => mainWindow.show() },
    { type: 'separator' },
    { label: 'Quit', click:  () => {
        app.isQuiting = true
        app.quit()
      }
    }
  ])
  tray.setToolTip('Infinitex new updates arriving')
  tray.setContextMenu(trayContextMenu)
})
autoUpdater.on('update-not-available', (info) => {
  notification = new Notification({
    title: 'InfiniTex',
    body: 'Your software is up to date!',
    silent: true,
    icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
  })
  notification.show()
})
autoUpdater.on('error', (err) => {
  notification = new Notification({
    title: 'InfiniTex',
    body: 'Error. Please file the issue written on your desktop! Click me!',
    icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
  })
  notification.show()
  notification.on('click', () => {
    shell.openItem('https://github.com/fetacore/Infinitex/issues')
    fs.writeFileSync(app.getPath('desktop')+'/infinitex-error.txt', err, 'utf-8')
  })
})
autoUpdater.on('download-progress', (e, progressObj) => {
  tray.setToolTip('Downloaded: ' + progressObj.percent+'% with speed:' + progressObj.bytesPerSecond * 1024 * 1024+'MB/s')
})
autoUpdater.on('update-downloaded', (info) => {
  notification = new Notification({
    title: 'Updater',
    body: 'Update downloaded. Press here to quit and install!',
    icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
  })
  notification.show()
  notification.on('click', () => {
    app.isQuiting = true
    tray.destroy()
    autoUpdater.quitAndInstall()
  })
  let trayContextMenu = Menu.buildFromTemplate([
    {label: 'Click to quit and update', click: () => {
      app.isQuiting = true
      tray.destroy()
      autoUpdater.quitAndInstall()
    }}
  ])
  tray.setContextMenu(trayContextMenu)
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('notify', (event, arg) => {
  if (arg == 'ServerError') {
    notification = new Notification({
      title: 'Error',
      body: '',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == '4characters') {
    notification = new Notification({
      title: 'Error',
      body: 'You need at least 4 characters to perform a search',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'unsupportedFP') {
    notification = new Notification({
      title: 'Error',
      body: 'The file type you want to open is unsupported',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'FileWasNotSaved') {
    notification = new Notification({
      title: 'Incomplete',
      body: 'You did not save the file',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'FileCouldNotBeSaved') {
    notification = new Notification({
      title: 'Error',
      body: 'Tex File could not be saved',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'FileSaved') {
    notification = new Notification({
      title: 'Success',
      body: 'Your file was successfully saved!',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'BibCouldNotBeSaved') {
    notification = new Notification({
      title: 'Error',
      body: 'Bibliography File could not be saved',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'DidNotChooseFile') {
    notification = new Notification({
      title: 'Incomplete',
      body: 'You did not choose a file',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'CouldNotOpenFile') {
    notification = new Notification({
      title: 'Error',
      body: 'Could not open Tex file',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'CouldNotOpenBibFile') {
    notification = new Notification({
      title: 'Error',
      body: 'Could not open Bibliography file',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'DidNotFindData') {
    notification = new Notification({
      title: 'No luck',
      body: 'Could not find books for this search. Check Spelling',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'BadServer') {
    notification = new Notification({
      title: 'Error',
      body: 'Bad Server Response while fetching data',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'ServerDown') {
    notification = new Notification({
      title: 'Error',
      body: 'Server might be down',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'CitationOK') {
    notification = new Notification({
      title: 'Success',
      body: 'Citation was created',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'PDFFileCouldNotBeSaved') {
    notification = new Notification({
      title: 'Error',
      body: 'Could not save the pdf file',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'DownloadSuccess') {
    notification = new Notification({
      title: 'Success',
      body: 'Check in your project the Literature folder',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'IncorrectFilename') {
    notification = new Notification({
      title: 'Error',
      body: 'Make sure the file name does not have gaps',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else if (arg == 'NeedFilepath') {
    notification = new Notification({
      title: 'Error',
      body: 'First you need to save the project',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
  } else {
    notification = new Notification({
      title: 'Install TeX',
      body: 'You need to install TeX in order to use it',
      silent: true,
      icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
    })
    notification.show()
    notification.on('click', () => {
      if (process.platform == 'darwin') {
        shell.openItem('http://www.tug.org/mactex/mactex-download.html')
      } else if (process.platform == 'win32') {
        shell.openItem('https://miktex.org/download')
      } else if (process.platform == 'linux') {
        shell.openItem('https://tex.stackexchange.com/a/134377')
      }
    })
  }
})

ipcMain.on('createTexBibFile', (event, [filepath, texdata, bibdata]) => {
  fs.writeFile(filepath, texdata, 'utf-8', (err) => {
    if (err) {
      notification = new Notification({
        title: 'Error',
        body: 'Your file was not saved due to ' + err,
        silent: true,
        icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
      })
      notification.show()
    } else {
      let texfile = path.basename(filepath)
      let folder = filepath.replace(texfile, '')
      let files = fs.readdirSync(folder)
      let foundbib = false
      for (let i = 0; i < files.length; i++) {
        let filename = path.join(folder, files[i])
        if (filename.indexOf('.bib')>=0) {
          foundbib = true
          fs.writeFileSync(filename, bibdata, 'utf-8')
        }
      }
      if (!foundbib) {
        fs.writeFileSync(filepath.replace('.tex', '.bib'), bibdata, 'utf-8')
      }
    }
  })
})

ipcMain.on('downloadWriteFile', (event, [filepath, data]) => {
  fs.writeFileSync(filepath, data, 'utf-8')
})

ipcMain.on('createFile', (event, [filepath, data]) => {
  fs.writeFile(filepath, data, 'utf-8', (err) => {
    if (err) {
      notification = new Notification({
        title: 'Error',
        body: 'Your file was not saved due to ' + err,
        silent: true,
        icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
      })
      notification.show()
    }
  })
})

ipcMain.on('openTexBibFile', (event, filepath) => {
  fs.readFile(filepath, 'utf-8', (err, texdata) => {
    if (err) {
      notification = new Notification({
        title: 'Error',
        body: 'Could not open Tex file',
        silent: true,
        icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
      })
      notification.show()
    } else {
      let texfile = path.basename(filepath)
      let folder = filepath.replace(texfile, '')
      let files = fs.readdirSync(folder)
      let foundbib = false
      for (let i = 0; i < files.length; i++) {
        let filename = path.join(folder, files[i])
        if (filename.indexOf('.bib')>=0) {
          foundbib = true
          fs.readFile(filename, 'utf-8', (error, bibdata) => {
            if (error) {
              notification = new Notification({
                title: 'Error',
                body: 'Could not open Bibliography file',
                silent: true,
                icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
              })
              notification.show()
              event.sender.send('texDataDummy', [texdata, ''])
            } else {
              event.sender.send('texDataDummy', [texdata, bibdata])
            }
          })
        }
      }
      if (!foundbib) {
        notification = new Notification({
          title: 'Error',
          body: 'Could not find Bibliography file',
          silent: true,
          icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
        })
        notification.show()
        event.sender.send('texDataDummy', [texdata, ''])
      }
    }
  })
})

ipcMain.on('openFile', (event, [whereTo, filepath]) => {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      notification = new Notification({
        title: 'Error',
        body: 'Your file could not be loaded. Maybe it is corrupted!',
        silent: true,
        icon: nativeImage.createFromPath(__dirname + '/static/infty_white.png')
      })
      notification.show()
    } else {
      event.sender.send(whereTo, data)
    }
  })
})

ipcMain.on('openPDF', (event, arg) => {
  fs.readFile(arg, (err, data) => {
    // let b = new Buffer(data).toString('base64');
    let raw = new Buffer(data).toString('base64')
    let uint8Array = new Uint8Array(raw.length)
    for (let i = 0; i < raw.length; i++) {
      uint8Array[i] = raw.charCodeAt(i)
    }
    // event.sender.send('getPDF', b);
    event.sender.send('getPDF', uint8Array)
  })
})

ipcMain.on('saveTexDialog', (event) => {
  dialog.showSaveDialog({
    title: 'Save As',
    defaultPath: app.getPath('desktop'),
    filters: [
      { name: 'TeX', extensions: ['tex'] }
    ]
  }, (fileName) => {
    event.sender.send('saveTexDialogFilename', fileName)
  })
})

ipcMain.on('openTexDialog', (event) => {
  dialog.showOpenDialog({
    title: 'Open an Existing Project',
    defaultPath: app.getPath('desktop'),
    filters: [
      { name: 'TeX', extensions: ['tex'] }
    ]
  }, (fileNames) => {
    event.sender.send('openTexDialogFilename', fileNames)
  })
})

ipcMain.on('figureTexDialog', (event) => {
  dialog.showOpenDialog({
    title: 'Find the Figure',
    defaultPath: app.getPath('desktop'),
    filters: [
      { name: 'Figures', extensions: ['jpg', 'jpeg', 'png'] }
    ]
  }, (fileNames) => {
    event.sender.send('figureTexDialogFilename', fileNames)
  })
})

ipcMain.on('saveTexDialogThenCompile', (event) => {
  dialog.showSaveDialog({
    title: 'Save As',
    defaultPath: app.getPath('desktop'),
    filters: [
      {name: 'TeX', extensions: ['tex']}
    ]
  }, (fileName) => {
    event.sender.send('saveTexDialogThenCompileFilename', fileName)
  })
})

ipcMain.on('get-file-data', (event) => {
  if (process.argv[1]) {
    event.returnValue = process.argv[1]
  } else {
    event.returnValue = null
  }
})

ipcMain.on('load-dictionary', (event) => {
  fs.readFile(__dirname+'/react/assets/ace/dictionaries/en_US/en_US.aff', 'utf-8', (err, aff) => {
    if (err) {
      return
    } else {
      fs.readFile(__dirname+'/react/assets/ace/dictionaries/en_US/en_US.dic', 'utf-8', (error, dic) => {
        if (error) {
          return
        } else {
          event.sender.send('dictionary-loaded', [aff, dic])
        }
      })
    }
  })
})
