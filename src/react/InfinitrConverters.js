import fs from 'fs'

export function mathOneLiner (string) {
  var i = 0
  for (i; i < string.length; i++) {
    string = string.replace('\n', '  ')
  }
  return string
}

export function reverseMathOneLiner (string) {
  var i = 0
  for (i; i < string.length; i++) {
    string = string.replace('  ', '\n')
  }
  return string
}
