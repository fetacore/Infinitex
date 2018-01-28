const path = require('path');

module.exports = {
  "make_targets": {
    "win32": [
      "squirrel"
    ],
    "darwin": [
      "dmg",
    ],
    "linux": [
      "deb",
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
    "icon": 'src/static/icon.png',
    "categories": [
      "Office"
    ],
    "depends": [
      'texlive-full',
      'libnotify4'
    ]
  },
  "windowsStoreConfig": {
    "packageName": "",
    "name": "infinitex"
  }
}
