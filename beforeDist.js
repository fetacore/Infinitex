const shelljs = require('shelljs')

let unpacked = null
let fpresolver = null

switch (process.platform) {
  case 'win32':
    unpacked = 'win-unpacked'
    fpresolver = '\\'
    break;
  case 'linux':
    unpacked = 'linux-unpacked'
    fpresolver = '/'
    break;
  default:
    unpacked = 'mac-unpacked'
    fpresolver = '/'
}

function removeUnnecessary () {
  shelljs.rm('-rf',
    __dirname + fpresolver + 'prod' + fpresolver + 'dist' + fpresolver + unpacked + fpresolver + 'locales' + fpresolver,
    __dirname + fpresolver + 'prod' + fpresolver + 'dist' + fpresolver + unpacked + fpresolver + 'pdf_viewer_resources.pak'
  )
}

exports.default = async function(context) {
  removeUnnecessary()
}
