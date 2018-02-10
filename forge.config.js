const path = require('path');

module.exports = {
  "make_targets": {
    "win32": [
      "wix"
    ],
    "darwin": [
      "dmg",
    ],
    "linux": [
      "deb",
      "rpm",
    ]
  },
  "electronPackagerConfig": {
    "asar": true,
    "prune": true,
    "icon": 'src/static/icon.png',
    "packageManager": "yarn"
  },
  "electronWinstallerConfig": {
    "name": "infinitex"
  },
  "electronInstallerDebian": {
    "icon": {
      '48x48': 'src/static/Icons/Icon48.png',
      '64x64': 'src/static/Icons/Icon64.png',
      '128x128': 'src/static/Icons/Icon128.png',
      '256x256': 'src/static/Icons/Icon256.png',
      'scalable': 'src/static/Icons/Icon.svg'
    },
    "categories": [
      "Office"
    ],
    "depends": [
      'texlive-full',
      'libnotify4'
    ]
  },
  "electronInstallerRedhat": {
    "icon": {
      '48x48': 'src/static/Icons/Icon48.png',
      '64x64': 'src/static/Icons/Icon64.png',
      '128x128': 'src/static/Icons/Icon128.png',
      '256x256': 'src/static/Icons/Icon256.png',
      'scalable': 'src/static/Icons/Icon.svg'
    }
  },
  "windowsStoreConfig": {
    "packageName": "",
    "name": "infinitex"
  }
}
