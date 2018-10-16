import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Grid from './Grid.jsx'
import path from 'path'

const { remote, ipcRenderer } = require('electron')
const { Menu } = remote

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      file: null,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.drag = this.drag.bind(this)
    this.drop = this.drop.bind(this)
  }

  componentDidMount () {
    this.updateWindowDimensions()
    ipcRenderer.send('load-dictionary')
    this.openFileWithApp()
    window.addEventListener('resize', this.updateWindowDimensions)
    window.addEventListener('dragover', this.drag, false)
    window.addEventListener('drop', this.drop, false)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions)
    window.removeEventListener('dragover', this.drag)
    window.removeEventListener('drop', this.drop)
  }

  updateWindowDimensions () {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  openFileWithApp () {
    let d = ipcRenderer.sendSync('get-file-data')
    if (d !== null) {
      if (d !== '.') {
        if (path.extname(d) == '.tex') {
          this.setState({
            file: d
          })
        }
      }
    }
  }

  drag (event) {
    event.preventDefault()
    return false
  }

  drop (event) {
    event.preventDefault()
    return false
  }

  render () {
	  return (
      <div>
        <TransitionGroup>
          <CSSTransition
            key={1}
            classNames='networkstuff'
            timeout={{ enter: 450, exit: 450 }}
    	    >
            <div>
              <Grid
                width={this.state.width}
                height={this.state.height}
                fileToOpen={this.state.file}
    					/>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}
