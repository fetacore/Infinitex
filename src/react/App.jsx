import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/FloatingActionButton'
import Add from 'material-ui/svg-icons/content/add'
import Remove from 'material-ui/svg-icons/content/remove'
import Close from 'material-ui/svg-icons/navigation/close'
import Edit from 'material-ui/svg-icons/image/edit'
import DirectionsBike from 'material-ui/svg-icons/maps/directions-bike'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Grid from './Grid.jsx'
import SimpleEditor from './Editor.jsx'
import path from 'path'

const { remote, ipcRenderer } = require('electron')
const { Menu } = remote

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      component: null,
      file: null,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.drag = this.drag.bind(this)
    this.drop = this.drop.bind(this)
  }

  componentDidMount () {
    this.updateWindowDimensions()
    this.openFileWithApp()
    window.addEventListener('resize', this.updateWindowDimensions)
    window.addEventListener('dragover', this.drag, false)
    window.addEventListener('drop', this.drop, false)

    ipcRenderer.on('switchToScience', (event, arg) => {
      if (arg) {
        this.setState({ component: 'tex', file: null })
      }
    })

    ipcRenderer.on('switchToSimple', (event, arg) => {
      if (arg) {
        this.setState({ component: 'simple', file: null })
      }
    })
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
            file: d,
            component: 'tex'
          })
        } else if ((path.extname(d) == '.draft') || (path.extname(d) == '.cdraft')) {
          this.setState({
            file: d,
            component: 'simple'
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

  onButtonClick (which) {
    if (which == 'tex') {
      this.setState({component: 'tex'})
    } else {
      this.setState({component: 'simple'})
    }
  }

  render () {
    let styles = {
      buttonArea: {
        marginTop: '100',
        display: 'inline-block',
        backgroundColor: '#111',
        textAlign: 'center',
        width: window.innerWidth,
        height: window.innerHeight / 6
      },
      buttons: {
        margin: '2%',
        width: window.innerWidth / 4,
        height: window.innerHeight / 6,
        color: '#fff',
        backgroundColor: '#111'
      },
      logo: {
        textAlign: 'center',
        margin: '8%',
        width: '10%'
      },
      titleBarButtons: {
        height: 22,
        width: 22,
        marginRight: 7,
        backgroundColor: '#fcfcfc',
        boxShadow: 'none'
      },
      titleBarButtonsVideo: {
        height: 22,
        width: 22,
        marginRight: 7,
        fill: 'white',
        backgroundColor: '#111',
        color: '#fff',
        boxShadow: 'none'
      }
    }
    let content = null
    if (this.state.component == null) {
      content =
      <CSSTransition
        key={0}
        classNames='networkstuff'
        timeout={{ enter: 450, exit: 450 }}
	    >
        <div style={{backgroundColor: '#111', height: window.innerHeight}}>
          <div style={{textAlign: 'center'}}>
            <object type='image/svg+xml' style={styles.logo} data='../src/static/infty_white.svg' />
          </div>
          <div style={styles.buttonArea}>
            <RaisedButton
              label='Science'
              labelPosition='after'
              icon={<Edit />}
              style={styles.buttons}
              primary
              onClick={() => this.onButtonClick('tex')}
				    />
            <RaisedButton
              label='Non-Science'
              labelPosition='after'
              icon={<DirectionsBike />}
              style={styles.buttons}
              primary
              onClick={() => this.onButtonClick('simple')}
				    />
          </div>
        </div>
      </CSSTransition>
    } else if (this.state.component == 'tex') {
      content =
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
    } else {
      content =
      <CSSTransition
        key={2}
        classNames='networkstuff'
        timeout={{ enter: 450, exit: 450 }}
	    >
        <div>
          <SimpleEditor
            width={this.state.width}
            height={this.state.height}
            fileToOpen={this.state.file}
					/>
        </div>
      </CSSTransition>
    }
	  return (
      <div>
        <TransitionGroup>
          {content}
        </TransitionGroup>
      </div>
    )
  }
}
