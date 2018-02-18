const path = require('path')

if (process.platform == 'win32') {
  var icon = 'src/static/icon.ico'
} else if (process.platform == 'darwin') {
  var icon = 'src/static/icon.icns'
} else {
  var icon = 'src/static/icon.png'
}

module.exports = {
  'make_targets': {
    'win32': [
      'squirrel'
    ],
    'darwin': [
      'dmg'
    ],
    'linux': [
      'deb',
      'rpm'
    ]
  },
  'electronPackagerConfig': {
    'asar': true,
    'prune': true,
    'icon': icon,
    'packageManager': 'yarn'
  },
  'electronInstallerDebian': {
    'icon': {
      '48x48': 'src/static/Icons/Icon48.png',
      '64x64': 'src/static/Icons/Icon64.png',
      '128x128': 'src/static/Icons/Icon128.png',
      '256x256': 'src/static/Icons/Icon256.png',
      'scalable': 'src/static/Icons/Icon.svg'
    },
    'categories': [
      'Office'
    ],
    'depends': [
      'texlive-full',
      'libnotify4'
    ]
  },
  'electronInstallerRedhat': {
    'icon': {
      '48x48': 'src/static/Icons/Icon48.png',
      '64x64': 'src/static/Icons/Icon64.png',
      '128x128': 'src/static/Icons/Icon128.png',
      '256x256': 'src/static/Icons/Icon256.png',
      'scalable': 'src/static/Icons/Icon.svg'
    }
  },
  'electronWinstallerConfig': {
    'name': 'Infinitex',
    'iconURL': 'file:\\\\' + __dirname + '/src/static/icon.ico',
    'setupIcon': './src/static/icon.ico',
    'setupExe': 'Infinitex_setup.exe',
    'loadingGif': './src/static/icon.gif'
  }
}
