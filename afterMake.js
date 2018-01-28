const shelljs = require('shelljs');
const fs = require('fs');
var json = require('./package.json')

function copyPasteStuff() {
  shelljs.mv(__dirname+'/out/make/InfiniTex_'+json.version+'_amd64.deb', __dirname+'/')
  removeStuff()
}

function removeStuff() {
  shelljs.rm('-rf', __dirname+'/node_modules/')
  shelljs.rm('-rf', __dirname+'/out/')
  shelljs.rm('-rf', __dirname+'/src/')
  shelljs.rm('-rf', __dirname+'/package.json')
  shelljs.rm('-rf', __dirname+'/forge.config.js')
  shelljs.rm('-rf', __dirname+'/yarn.lock')
  shelljs.rm('-rf', __dirname+'/afterMake.js')
}

copyPasteStuff();
