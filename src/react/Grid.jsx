import React from 'react'
import PropTypes from 'prop-types'
import ReactGridLayout from 'react-grid-layout'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import CircularProgress from 'material-ui/CircularProgress'
import LinearProgress from 'material-ui/LinearProgress'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import ActionCode from 'material-ui/svg-icons/action/code'
import ActionExtension from 'material-ui/svg-icons/action/extension'
import ActionFlipToBack  from 'material-ui/svg-icons/action/flip-to-back'
import ActionFlipToFront from 'material-ui/svg-icons/action/flip-to-front'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionVisibility from 'material-ui/svg-icons/action/visibility'
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import AvAddToQueue from 'material-ui/svg-icons/av/add-to-queue'
import CommunicationImportContacts from 'material-ui/svg-icons/communication/import-contacts'
import CommunicationScreenShare from 'material-ui/svg-icons/communication/screen-share'
import CommunicationStopScreenShare from 'material-ui/svg-icons/communication/stop-screen-share'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentSelectAll from 'material-ui/svg-icons/content/select-all'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import AlertAddAlert from 'material-ui/svg-icons/alert/add-alert'
import EditorFunctions from 'material-ui/svg-icons/editor/functions'
import EditorFormatPaint from 'material-ui/svg-icons/editor/format-paint'
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import AceEditor from 'react-ace'
import brace from 'brace'
import './assets/ace/tex.js'
import 'brace/mode/snippets.js'
import './assets/ace/snippetsTex.js'
import 'brace/ext/language_tools.js'
import 'brace/ext/searchbox.js'
import 'brace/keybinding/vim.js'
import request from 'request'
import JSSoup from 'jssoup'
import { Document, Page } from 'react-pdf'
import './assets/ace/chaos.js'
import './assets/ace/light.js'
import './assets/ace/red.js'
import './assets/ace/green.js'
import './assets/ace/purple.js'
import { mathOneLiner, reverseMathOneLiner } from './InfinitrConverters.js'
import { startTex, startBib } from './assets/texstarters/start.js'
import { thesisTex, thesisBib } from './assets/texstarters/thesis.js'
import { presentationTex, presentationBib } from './assets/texstarters/presentation.js'
import { cvTex, cvBib } from './assets/texstarters/cv.js'
import { draftTex, draftBib } from './assets/texstarters/draft.js'

const {
  app,
  shell,
  process,
  Menu
} = require('electron').remote
const { remote, ipcRenderer } = require('electron')
const shelljs = require('shelljs')

const buttonStyles = {
  textAlign: 'center',
  backgroundColor: '#666666'
}

import pdfjs from 'pdfjs-dist/build/pdf.min.js'

pdfjs.PDFJS.GlobalWorkerOptions.workerSrc = '../src/react/reactPdf/pdf.worker.min.js'
pdfjs.PDFJS.cMapUrl = '../src/react/reactPdf/cmaps/'
pdfjs.PDFJS.cMapPacked = true

const codeIcon = <ActionCode />
const previewIcon = <ActionVisibility />
const previewNotIcon = <ActionVisibilityOff />
const splitIcon = <ActionFlipToFront />
const splitNotIcon = <ActionFlipToBack />
const searchIcon = <ActionSearch />
const biblioIcon = <CommunicationImportContacts />
const addIcon = <ContentAdd />
const extensionIcon = <ActionExtension />
const rightarrow = <NavigationArrowForward />
const previousPageIcon = <HardwareKeyboardArrowLeft />
const nextPageIcon = <HardwareKeyboardArrowRight />
const networkOnIcon = <CommunicationScreenShare />
const networkOffIcon = <CommunicationStopScreenShare />
const openAll = <ContentSelectAll />
const openProjectIcon = <AvAddToQueue />
const themeIcon = <EditorFormatPaint />

export default class Grid extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: 'Default',
      matheditorinput: '',
      mathhtml: '',
      showmatheditorbox: false,
      showmathpreviewbox: false,
      showpastematheditorbox: false,
      texfilecontent: '',
      texRow: 1,
      texColumn: 1,
      bibfilecontent: '',
      bibRow: 1,
      bibColumn: 1,
      splitRow: 1,
      splitColumn: 1,
      textSourceBib: 0,
      // Switches
      preview: true,
      split: false,
      networkFeatures: true,
      // //////////
      filepath: null,
      PDFLoading: false,
      numPages: null,
      pageIndex: null,
      binaryPDFContent: null,
      networkPageIndex: 1,
      paperKeyword: '',
      literatureSearchResults: [],
      literatureSearchResultsDisplay: false,
      literatureSearchResultsSelectedIndex: 0,
      literatureSearchResultsSelectedDisplay: false,
      citationNicknameDialogDisplay: false,
      citationNickname: '',
      areYouSureDialogDisplay: false,
      areYouSureTemplateDialogDisplay: false,
      packageDialog: false,
      packages: ''
    }
  }

  componentWillMount () {
    let checkTex = shelljs.which('pdflatex')
    if (checkTex == null) {
      this.onNotification('InstallTeX')
    }
  }

  componentDidMount () {
    if (this.props.fileToOpen !== null) {
      let fp = this.props.fileToOpen
      ipcRenderer.send('openTexBibFile', fp)
      this.setState({
        filepath: fp
      }, () => {
        if (this.state.preview) {
          if (shelljs.test('-e', this.state.filepath.replace('.tex', '.pdf'))) {
            this.setState({
              PDFLoading: true
            })
            ipcRenderer.send('openPDF', this.state.filepath.replace('.tex', '.pdf'))
          }
        }
      })
    } else {
      this.starterEditor()
    }
    document.getElementById('pdfContainer').addEventListener('wheel', this.onScrollPDF.bind(this))
    ipcRenderer.on('texDataDummy', (event, data) => {
      this.setState({
        texfilecontent: data.slice(data.indexOf('\\begin{document}') + 16, data.indexOf('\\end{document}')),
        packages: data.slice(0, data.indexOf('\\begin{document}') + 16),
        textSourceBib: 1
      }, () => {
        let skata = this.state.packages.split(/\r\n|\r|\n/).length
        this.refs.mainEditor.editor.setOption(
          'firstLineNumber', skata + 1
        )
        let mainSession = this.refs.mainEditor.editor.getSession()
        let mainUndoManager = mainSession.getUndoManager()
        mainUndoManager.reset()
        mainSession.setUndoManager(mainUndoManager)
        if (this.state.split) {
          this.refs.splitEditor.editor.setOption(
            'firstLineNumber', skata + 1
          )
          let splitSession = this.refs.splitEditor.editor.getSession()
          let splitUndoManager = splitSession.getUndoManager()
          splitUndoManager.reset()
          splitSession.setUndoManager(splitUndoManager)
        }
        let bibSession = this.refs.bibEditor.editor.getSession()
        let bibUndoManager = bibSession.getUndoManager()
        bibUndoManager.reset()
        bibSession.setUndoManager(bibUndoManager)
      })
    })
    ipcRenderer.on('bibDataDummy', (event, data) => {
      this.setState({
        bibfilecontent: data
      })
    })
    ipcRenderer.on('Open Project', (event, arg) => {
      if (arg) {
        this.onOpenProjectClick()
      }
    })
    ipcRenderer.on('Save Project', (event, arg) => {
      if (arg) {
        if (!this.state.filepath) {
          this.onCreateProjectClick()
        } else {
          ipcRenderer.send('createTexBibFile', [this.state.filepath, this.state.packages + this.state.texfilecontent + '\\end{document}', this.state.bibfilecontent])
        }
      }
    })
    ipcRenderer.on('Close Project', (event, arg) => {
      if (arg) {
        this.closeProject()
      }
    })
    ipcRenderer.on('Run Compilation', (event, arg) => {
      if (arg) {
        if (this.state.showmatheditorbox) {
          let math = katex.renderToString(this.state.matheditorinput, {
            displayMode: true,
            throwOnError: false
          });
          this.setState({
            showmathpreviewbox: true,
            mathhtml: math
          })
        } else {
          this.compileText()
        }
      }
    })
    ipcRenderer.on('getPDF', (event, b64data) => {
      if (b64data !== null) {
        this.setState({
          binaryPDFContent: window.atob(b64data)
        }, () => {
          if (this.state.PDFLoading) {
            this.setState({
              PDFLoading: false
            })
          }
        })
      } else {
        ipcRenderer.send('openPDF', this.state.filepath.replace('.tex', '.pdf'))
      }
    })
    ipcRenderer.on('saveTexDialogFilename', (event, fileName) => {
      let fpresolver = null
      switch (process.platform) {
        case 'win32':
          fpresolver = '\\'
          break
        default:
          fpresolver = '/'
      }
      if (fileName == null) {
        this.onNotification('FileWasNotSaved')
        return
      } else if (filetitle.indexOf(' ') !== -1) {
        this.onNotification('IncorrectFilename')
        return
      } else {
        let filetitle = fileName.slice(fileName.lastIndexOf(fpresolver) + 1, fileName.length)
        // fileName is a string that contains the path and filename created in the save file dialog.
        ipcRenderer.send('createTexBibFile', [fileName, this.state.packages + this.state.texfilecontent + '\\end{document}', this.state.bibfilecontent])
        this.setState({ filepath: fileName })
      }
    })
    ipcRenderer.on('openTexDialogFilename', (event, fileNames) => {
      if (fileNames == null) {
        this.onNotification('DidNotChooseFile')
        return
      }
      let fp = fileNames[0]
      ipcRenderer.send('openTexBibFile', fp)
      this.setState({
        filepath: fp
      }, () => {
        if (this.state.preview) {
          if (shelljs.test('-e', this.state.filepath.replace('.tex', '.pdf'))) {
            this.setState({
              PDFLoading: true
            }, () => {
              ipcRenderer.send('openPDF', this.state.filepath.replace('.tex', '.pdf'))
            })
          }
        }
      })
    })
    ipcRenderer.on('figureTexDialogFilename', (event, fileNames) => {
      if (fileNames === undefined) {
        this.onNotification('DidNotChooseFile')
      } else {
        let fp = fileNames[0]
        let fpresolver = null
        switch (process.platform) {
          case 'win32':
            fpresolver = '\\'
            break
          default:
            fpresolver = '/'
        }
        let filetitle = this.state.filepath.slice(this.state.filepath.lastIndexOf(fpresolver) + 1, this.state.filepath.length)
        let figurePath = this.state.filepath.slice(0, this.state.filepath.indexOf(filetitle)) + 'Figures'
        if (!shelljs.test('-e', figurePath)) {
          shelljs.mkdir('-p', figurePath)
        }
        shelljs.cp(fp, figurePath)
        let figureName = fp.slice(fp.lastIndexOf(fpresolver) + 1, fp.length)
        let cursor = this.refs.mainEditor.editor.selection.getCursor()
        if (this.state.packages.indexOf('\\usepackage{graphicx}') == -1) {
          this.setState({
            packages: this.state.packages.slice(0, this.state.packages.indexOf('\\begin{document}')) + '\\usepackage{graphicx}\n\\begin{document}'
          })
        }
        this.refs.mainEditor.editor.insert(
          '\n\\begin{figure}[ht!]\n\
\t\\caption{Your figure caption here \\label{figure:nickname}}\n\
\t\\centering\n\
\t\\includegraphics[width=0.7\\textwidth]{Figures/' + figureName + '}\n\
\\end{figure}\n\
You can refer to the graph as \\ref{figure:nickname}\n'
        )
        this.setState({
          texRow: cursor.row + 7,
          texColumn: cursor.column
        }, () => {
          this.focusEditor(0)
        })
      }
    })
    ipcRenderer.on('saveTexDialogThenCompileFilename', (event, fileName) => {
      if (fileName) {
        let fpresolver = null
        switch (process.platform) {
          case 'win32':
            fpresolver = '\\'
            break
          default:
            fpresolver = '/'
        }
        let filetitle = fileName.slice(fileName.lastIndexOf(fpresolver) + 1, fileName.length)
        if (fileName == null) {
          this.onNotification('FileWasNotSaved')
        } else if (filetitle.indexOf(' ') !== -1) {
          this.onNotification('IncorrectFilename')
        } else {
          ipcRenderer.send('createTexBibFile', [fileName, this.state.packages + this.state.texfilecontent + '\\end{document}', this.state.bibfilecontent])
          this.setState({
            filepath: fileName,
            PDFLoading: true,
            preview: true
          }, () => {
            this.actualCompilation()
          })
        }
      }
    })
  }

  componentWillUnmount () {
    document.getElementById('pdfContainer').removeEventListener('wheel', this.onScrollPDF.bind(this))
  }

  onScrollPDF (event) {
    if (this.state.filepath) {
      if (this.state.preview) {
        if (!this.state.PDFLoading) {
          let delta = null
          if (event.wheelDelta) {
            delta = event.wheelDelta
          } else {
            delta = -1 * event.deltaY
          }
          if (delta < -20) {
            this.nextPage()
          } else if (delta > 10) {
            this.previousPage()
          }
        }
      }
    }
  }

  previousPage () {
    if (this.state.pageIndex > 0) {
      this.setState((prevState) => ({
        pageIndex: prevState.pageIndex - 1
      }))
    }
  }

  nextPage () {
    if (this.state.pageIndex + 1 < this.state.numPages) {
      this.setState((prevState) => ({
        pageIndex: prevState.pageIndex + 1
      }))
    }
  }

  onNotification (name) {
    ipcRenderer.send('notify', name)
  }

  editorLeftClickWithLiteratureDisplay (infIconPageNavigation) {
    if (this.state.literatureSearchResultsDisplay) {
      this.setState({
        literatureSearchResultsDisplay: false,
        networkFeatures: false
      }, () => {
        this.focusEditor(this.state.textSourceBib)
      })
    } else {
      this.setState({networkPageIndex: infIconPageNavigation})
    }
  }

  editorLeftClickWithoutLiteratureDisplay (infIconPageNavigation) {
    this.setState({networkPageIndex: infIconPageNavigation}, () => {
      if (this.state.filepath) {
        if (this.state.preview) {
          this.setState({
            preview: false
          })
        }
      }
    })
  }

  goToSimple () {
    ipcRenderer.send('goToFuckinSimple', true)
  }

  onDocumentLoadSuccess (nPages) {
    if (this.state.pageIndex == null) {
      this.setState({
        numPages: nPages,
        pageIndex: 0
      })
    } else if (this.state.pageIndex > nPages) {
      this.setState({
        numPages: nPages,
        pageIndex: nPages - 1
      })
    } else {
      this.setState({
        numPages: nPages
      })
    }
  }

  starterEditor () {
    setTimeout(() => {
      this.setState({
        texfilecontent: startTex.slice(startTex.indexOf('\\begin{document}') + 16, startTex.indexOf('\\end{document}')),
        packages: startTex.slice(0, startTex.indexOf('\\begin{document}') + 16),
        bibfilecontent: startBib,
        texRow: 16,
        texColumn: 1,
        bibRow: 9,
        bibColumn: 1,
        textSourceBib: 1
      }, () => {
        let skata = this.state.packages.split(/\r\n|\r|\n/).length
        this.refs.mainEditor.editor.setOption(
          'firstLineNumber', skata + 1
        )
        let mainSession = this.refs.mainEditor.editor.getSession()
        let mainUndoManager = mainSession.getUndoManager()
        mainUndoManager.reset()
        mainSession.setUndoManager(mainUndoManager)
        let bibSession = this.refs.bibEditor.editor.getSession()
        let bibUndoManager = bibSession.getUndoManager()
        bibUndoManager.reset()
        bibSession.setUndoManager(bibUndoManager)
        this.focusEditor(1)
      })
    }, 50)
  }

  onSearchDownloadBook () {
    if (this.state.paperKeyword.length < 4) {
      this.setState({
        networkPageIndex: 3
      }, () => {
        this.onNotification('4characters')
      })
    } else {
      this.libgen()
    }
  }

  onSearchDownloadPaper () {
    if (this.state.paperKeyword.length < 4) {
      this.setState({
        networkPageIndex: 5
      }, () => {
        this.onNotification('4characters')
      })
    } else {
      this.scimag()
    }
  }

  scimag () {
    shell.openItem('http://gen.lib.rus.ec/scimag/index.php?s=' + encodeURIComponent(this.state.paperKeyword) + '&journalid=&v=&i=&p=')
  }

  onAddFigureClick () {
    if (this.state.filepath) {
      ipcRenderer.send('figureTexDialog')
    } else {
      this.onNotification('NeedFilepath')
    }
  }

  updatePackages (value) {
    let skata = this.state.packages.split(/\r\n|\r|\n/).length
    this.setState({
      packages: value
    }, () => {
      let newskata = this.state.packages.split(/\r\n|\r|\n/).length
      if (newskata !== skata) {
        this.refs.mainEditor.editor.setOption(
          'firstLineNumber', newskata + 1
        )
      }
    })
  }

  onFocusMainEditor (event) {
    event.preventDefault()
    event.stopPropagation()
    let crsr = this.refs.mainEditor.editor.selection.getCursor()
    this.setState({
      texRow: crsr.row,
      texColumn: crsr.column,
      textSourceBib: 0
    }, () => {
      this.refs.mainEditor.editor.clearSelection()
      setTimeout(() => {
        this.focusEditor(0)
      }, 0.1)
    })
  }

  onFocusBibEditor (event) {
    event.preventDefault()
    event.stopPropagation()
    let crsr = this.refs.bibEditor.editor.selection.getCursor()
    this.setState({
      bibRow: crsr.row,
      bibColumn: crsr.column
    }, () => {
      this.refs.bibEditor.editor.clearSelection()
      setTimeout(() => {
        this.focusEditor(1)
      }, 0.1)
    })
  }

  onFocusSplitEditor (event) {
    event.preventDefault()
    event.stopPropagation()
    let crsr = this.refs.splitEditor.editor.selection.getCursor()
    this.setState({
      splitRow: crsr.row,
      splitColumn: crsr.column
    }, () => {
      this.refs.splitEditor.editor.clearSelection()
      setTimeout(() => {
        this.focusEditor(2)
      }, 0.1)
    })
  }

  onCreateProjectClick () {
    ipcRenderer.send('saveTexDialog')
  }

  onOpenProjectClick () {
    ipcRenderer.send('openTexDialog')
  }

  libgen () {
    request('http://gen.lib.rus.ec/search.php?&req=' + encodeURIComponent(this.state.paperKeyword) + '&view=detailed&res=100', (err, response, body) => {
      switch (err) {
        case null:
          switch (response.statusCode) {
            case 200:
              let ids = []
              var soup = new JSSoup(body).findAll('table')
              for (var i = 0; i < soup.length; i++) {
                if (soup[i].findAll('td').length == 43) {
                  ids.push(soup[i].findAll('td')[26].contents[0]._text)
                }
                if (i == soup.length - 1) {
                  request({ url: `http://gen.lib.rus.ec/json.php?ids=${ids.join(',')}&fields=*` },
                    (err, response, body) => {
                      switch (err) {
                        case null:
                          switch (response.statusCode) {
                            case 200:
                              this.setState({
                                literatureSearchResults: JSON.parse(body),
                                networkPageIndex: 4,
                                literatureSearchResultsDisplay: true
                              })
                              break
                            case 400:
                              this.onNotification('DidNotFindData')
                              this.setState({
                                networkPageIndex: 3
                              })
                              break
                            default:
                              this.onNotification('BadServer')
                              this.setState({
                                networkPageIndex: 3
                              })
                          }
                          break
                        default:
                          this.onNotification('ServerDown')
                          this.setState({
                            networkPageIndex: 3
                          })
                          break
                      }
                    }
                  )
                }
              }
              break
            default:
              this.onNotification('BadServer')
              this.setState({
                networkPageIndex: 3
              })
              break
          }
          break
        default:
          this.onNotification('ServerDown')
          this.setState({
            networkPageIndex: 3
          })
          break
      }
    }
    )
  }

  createCitationFromLiterature () {
    if (this.state.filepath) {
      if (this.state.literatureSearchResults.length !== 0) {
        let cit = '\u0040book\u007B' + this.state.citationNickname + ', \n\t\
author = \u007B' + this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].author.replace(';', ' and').replace(',', ' and') + '\u007D,\n\t\
title = \u007B' + this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].title + '\u007D,\n\t\
publisher = \u007B' + this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].publisher + '\u007D,\n\t\
year = ' + this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].year + ',\n\t\
note = ,\n\u007D\n'
        this.setState({
          textSourceBib: 1,
          literatureSearchResultsDisplay: false,
          literatureSearchResultsSelectedDisplay: false,
          bibfilecontent: this.state.bibfilecontent + cit
        }, () => {
          this.refs.bibEditor.editor.focus() // To focus the ace editor
          let n = this.refs.bibEditor.editor.getSession().getValue().split('\n').length // To count total no. of lines
          this.refs.bibEditor.editor.gotoLine(n) // Go to end of document
          this.onNotification('CitationOK')
        })
      }
    } else {
      shell.openExternal('http://gen.lib.rus.ec/book/bibtex.php?md5=' + this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].md5.toLowerCase())
    }
  }

  updateProgress (e) {
    if (e.lengthComputable) {
      this.setState({
        downloadProgress: (e.loaded / e.total) * 100
      })
    }
  }

  downloadLiterature () {
    if (this.state.filepath) {
      let fsresolver = null
      if (process.platform == 'win32') {
        fsresolver = '\\'
      } else {
        fsresolver = '/'
      }
      const dlpath = this.state.filepath.replace(
        this.state.filepath.slice(this.state.filepath.lastIndexOf(fsresolver) + 1, this.state.filepath.length),
        'Literature'
      )
      const selectedLiteraturePath = (
        this.state.literatureSearchResults[
          this.state.literatureSearchResultsSelectedIndex
        ].title).replace(/ /g, '_') + '.' +
        this.state.literatureSearchResults[
          this.state.literatureSearchResultsSelectedIndex
        ].extension
      if (shelljs.test('-e', dlpath + fsresolver + selectedLiteraturePath)) {
        shell.openItem(dlpath + fsresolver + selectedLiteraturePath)
      } else {
        this.setState({
          // theme: 'Light',
          // literatureSearchResultsSelectedDisplay: false,
          // literatureSearchResultsDisplay: false,
          networkPageIndex: 4
        })
        shelljs.mkdir('-p', dlpath)
        // const req = new XMLHttpRequest();
        // req.addEventListener('progress', (e) => { this.updateProgress(e); }, false);
        // req.open(
        //   "GET",
        //   'http://gen.lib.rus.ec/get.php?md5='+
        //   this.state.literatureSearchResults[
        //     this.state.literatureSearchResultsSelectedIndex
        //   ].md5.toLowerCase(),
        //   true
        // );
        // req.responseType='arraybuffer';
        // req.onload = (e) => {
        //   let data = new Buffer(req.response);
        //   ipcRenderer.send('downloadWriteFile', [dlpath+fsresolver+selectedLiteraturePath, data]);
        //   this.onNotification('DownloadSuccess');
        //   this.setState({
        //     theme: 'Default',
        //     networkPageIndex:4,
        //     literatureSearchResultsDisplay: true,
        //     literatureSearchResultsSelectedDisplay: true,
        //     downloadProgress: 0,
        //   }, () => {
        //     shell.openItem(dlpath+fsresolver+selectedLiteraturePath)
        //   });
        // }
        // req.send();
        shell.openExternal('http://gen.lib.rus.ec/book/index.php?md5=' + this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].md5.toLowerCase())
      }
    } else {
      shell.openExternal('http://gen.lib.rus.ec/book/index.php?md5=' + this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].md5.toLowerCase())
    }
  }

  compileText () {
    if (this.state.filepath == null) {
      ipcRenderer.send('saveTexDialogThenCompile')
    } else {
      this.setState({
        PDFLoading: true,
        preview: true,
        binaryPDFContent: null
      }, () => {
        this.latexError = null
        this.actualCompilation()
      })
    }
  }

  actualCompilation () {
    let fpresolver = null
    let windowsCrapCDcommand = null
    document.body.style.cursor = 'wait',
    ipcRenderer.send('createTexBibFile', [this.state.filepath, this.state.packages + this.state.texfilecontent + '\n\\end{document}', this.state.bibfilecontent])
    switch (process.platform) {
      case 'win32':
        windowsCrapCDcommand = 'pushd '
        fpresolver = '\\'
        break
      default:
        windowsCrapCDcommand = 'cd '
        fpresolver = '/'
    }
    let filetitle = this.state.filepath.slice(this.state.filepath.lastIndexOf(fpresolver) + 1, this.state.filepath.length)
    shelljs.exec(windowsCrapCDcommand + '"' + this.state.filepath.replace(this.state.filepath.slice(this.state.filepath.lastIndexOf(fpresolver), this.state.filepath.length), '') + '"' +
  		' && pdflatex -interaction=nonstopmode -halt-on-error ' + filetitle +
  		' && bibtex ' + filetitle.slice(0, filetitle.lastIndexOf('.tex')) +
  		' && pdflatex -interaction=nonstopmode -halt-on-error ' + filetitle +
      ' && pdflatex -interaction=nonstopmode -halt-on-error ' + filetitle,
      { async: true },
  		(code, stdout, stderr) => {
      if (code !== 0) {
        switch (stdout.indexOf('! LaTeX Error') !== -1 || stdout.indexOf('! Undefined control sequence') !== -1 ||
              stdout.indexOf('! Too many }\'s') !== -1 || stdout.indexOf('! Paragraph ended before') !== -1 ||
              stdout.indexOf('! Missing $ inserted') !== -1 || stdout.indexOf('Runaway argument') !== -1 ||
              stdout.indexOf('! Argument of \\frame has an extra }') !== -1 || stdout.indexOf('! ') !== -1) {
          case stdout.indexOf('! LaTeX Error') !== -1:
            this.latexError = stdout.slice(
                  stdout.indexOf('! LaTeX Error'), stdout.indexOf('Transcript written on')
                ).replace(
                  'See the LaTeX manual or LaTeX Companion for explanation.', ''
                ).replace(
                  'Type  H <return>  for immediate help.', '\n'
                ).replace(
                  '...', '\n'
                ).replace(
                  '==> Fatal error occurred, no output PDF file produced!', ''
                ).replace(
                  'l.', 'line: '
                )
            break
          case stdout.indexOf('! Undefined control sequence') !== -1:
            this.latexError = stdout.slice(
                  stdout.indexOf('! Undefined control sequence'), stdout.indexOf('Fatal error occurred')
                ).replace(
                  'l.', 'line: '
                ) + '\n Command is wrong (probably typo)'
            break
          case stdout.indexOf('! Too many }\'s') !== -1:
            this.latexError = stdout.slice(
                  stdout.indexOf('! Too many }\'s'), stdout.indexOf('Here is how much of')
                ).replace(
                  'l.', 'line: '
                )
            break
          case stdout.indexOf('! Paragraph ended before') !== -1:
            this.latexError = stdout.slice(
                  stdout.indexOf('! Paragraph ended before'), stdout.indexOf('Here is how much of')
                ).replace(
                  'l.', 'line: '
                ) + '\n Missing }'
            break
          case stdout.indexOf('! Missing $ inserted') !== -1:
            this.latexError = stdout.slice(
                  stdout.indexOf('! Missing $ inserted'), stdout.indexOf('Here is how much of')
                ).replace(
                  'l.', 'line: '
                ) + '\n You used $ without writing math. If you want the symbol then use \$'
            break
          case stdout.indexOf('Runaway argument') !== -1:
            this.latexError = stdout.slice(
                  stdout.indexOf('Runaway argument'), stdout.indexOf('Here is how much of')
                ).replace(
                  'l.', 'line: '
                ) + '\n You need an extra }'
            break
          case stdout.indexOf('! Argument of \\frame has an extra }') !== -1:
            this.latexError = stdout.slice(
                  stdout.indexOf('! Argument of \\frame has an extra }'), stdout.indexOf('==> Fatal error occurred')
                ).replace(
                  'l.', 'line: '
                )
            break
          default:
            this.latexError = stdout.slice(
                  stdout.indexOf('! '), stdout.indexOf('==> Fatal error occurred')
                ).replace(
                  'l.', 'line: '
                )
            break
        }
        this.setState({
          PDFLoading: false,
        })
        document.body.style.cursor = 'default'
      } else {
        if (shelljs.test('-e', this.state.filepath.replace('.tex', '.pdf'))) {
          ipcRenderer.send('openPDF', this.state.filepath.replace('.tex', '.pdf'))
        }
      			document.body.style.cursor = 'default'
      }
    })
  }

  openLatexHelp () {
    shell.openItem('https://www.sharelatex.com/learn')
  }

  closeProject () {
    if (this.state.filepath) {
      this.setState({
        areYouSureDialogDisplay: true
      })
    }
  }

  initTemplate (arg) {
    if (arg == 'Thesis') {
      this.setState({
        texfilecontent: thesisTex.slice(thesisTex.indexOf('\\begin{document}') + 16, thesisTex.indexOf('\\end{document}')),
        packages: thesisTex.slice(0, thesisTex.indexOf('\\begin{document}') + 16),
        bibfilecontent: thesisBib
      }, () => {
        this.focusEditor(0)
      })
    } else if (arg == 'Presentation') {
      this.setState({
        texfilecontent: presentationTex.slice(presentationTex.indexOf('\\begin{document}') + 16, presentationTex.indexOf('\\end{document}')),
        packages: presentationTex.slice(0, presentationTex.indexOf('\\begin{document}') + 16),
        bibfilecontent: presentationBib
      }, () => {
        this.focusEditor(0)
      })
    } else if (arg == 'CV') {
      this.setState({
        texfilecontent: cvTex.slice(cvTex.indexOf('\\begin{document}') + 16, cvTex.indexOf('\\end{document}')),
        packages: cvTex.slice(0, cvTex.indexOf('\\begin{document}') + 16),
        bibfilecontent: cvBib
      }, () => {
        this.focusEditor(0)
      })
    } else {
      this.setState({
        texfilecontent: draftTex.slice(draftTex.indexOf('\\begin{document}') + 16, draftTex.indexOf('\\end{document}')),
        packages: draftTex.slice(0, draftTex.indexOf('\\begin{document}') + 16),
        bibfilecontent: draftBib
      }, () => {
        this.focusEditor(0)
      })
    }
  }

  focusEditor (index) {
    if (index == 0) {
      this.refs.mainEditor.editor.clearSelection()
      this.refs.mainEditor.editor.moveCursorTo(this.state.texRow, this.state.texColumn)
      this.refs.mainEditor.editor.scrollToLine(this.state.texRow, true, true)
      this.refs.mainEditor.editor.focus()
      this.refs.mainEditor.editor.clearSelection()
    } else if (index == 2){
      this.refs.splitEditor.editor.clearSelection()
      this.refs.splitEditor.editor.moveCursorTo(this.state.splitRow, this.state.splitColumn)
      this.refs.splitEditor.editor.scrollToLine(this.state.splitRow, true, true)
      this.refs.splitEditor.editor.focus()
      this.refs.splitEditor.editor.clearSelection()
    } else {
      this.refs.bibEditor.editor.clearSelection()
      this.refs.bibEditor.editor.moveCursorTo(this.state.bibRow, this.state.bibColumn)
      this.refs.bibEditor.editor.scrollToLine(this.state.bibRow, true, true)
      this.refs.bibEditor.editor.focus()
      this.refs.bibEditor.editor.clearSelection()
    }
  }

  onBlurMainEditor () {
    const cursor = this.refs.mainEditor.editor.selection.getCursor()
    this.setState({
      texRow: cursor.row,
      texColumn: cursor.column + 1
    })
  }

  onBlurBibEditor () {
    const cursor = this.refs.bibEditor.editor.selection.getCursor()
    this.setState({
      bibRow: cursor.row,
      bibColumn: cursor.column + 1
    })
  }

  updateTexInput (value) {
    this.setState({
      texfilecontent: value,
    })
  }

  updateSplitInput (value) {
    this.setState({
      texfilecontent: value,
    })
  }

  updateBibInput (value) {
    this.setState({
      bibfilecontent: value,
    })
  }

  updateMathEditorInput (value) {
    this.setState({
      matheditorinput: value,
    })
  }

  compileMathEditor (value) {
    let math = katex.renderToString(value, {
      displayMode: true,
      throwOnError: false
    });
    this.setState({
      showmathpreviewbox: true,
      mathhtml: math
    })
  }

  pdfNewWindow (pdffilepath) {
    shell.openItem(pdffilepath)
  }

  contextMenuBuilder (e, arg) {
    e.preventDefault()
    if (arg == 'loginchat') {
      var contextMenuTemplate = [
        {
          label: 'Toggle Collaboration Tools Off',
          click: () => {
            this.setState({networkFeatures: false})
          }
        }
      ]
    } else if (arg == 'editor') {
      var contextMenuTemplate = [
        {
          label: 'Start With Template',
          submenu: [
            {
              label: 'Draft',
              click: () => {
                if (!this.state.filepath) {
                  this.initTemplate('Draft')
                } else {
                  this.templateArg = 'Draft'
                  this.setState({
                    areYouSureTemplateDialogDisplay: true
                  })
                }
              }
            },
            {
              label: 'Thesis',
              click: () => {
                if (!this.state.filepath) {
                  this.initTemplate('Thesis')
                } else {
                  this.templateArg = 'Thesis'
                  this.setState({
                    areYouSureTemplateDialogDisplay: true
                  })
                }
              }
            },
            {
              label: 'Presentation',
              click: () => {
                if (!this.state.filepath) {
                  this.initTemplate('Presentation')
                } else {
                  this.templateArg = 'Presentation'
                  this.setState({
                    areYouSureTemplateDialogDisplay: true
                  })
                }
              }
            },
            {
              label: 'CV',
              click: () => {
                if (!this.state.filepath) {
                  this.initTemplate('CV')
                } else {
                  this.templateArg = 'CV'
                  this.setState({
                    areYouSureTemplateDialogDisplay: true
                  })
                }
              }
            }
          ]
        },
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
      if (!this.state.preview) {
        contextMenuTemplate.push(
					{type: 'separator'},
          {label: 'Toggle PDF Preview',
            click: () => this.setState({preview: true})}
				)
      }
      if (!this.state.networkFeatures) {
        contextMenuTemplate.push(
					{type: 'separator'},
          {label: 'Open Expansion',
            click: () => this.setState({networkFeatures: true})
          }
				)
      }
    } else if (arg == 'editorUtils') {
      var contextMenuTemplate = [
        {
          label: 'You are in the editor utilities'
        }
      ]
    } else if (arg == 'editorCollabUtils') {
      var contextMenuTemplate = [
        {
          label: 'You are in the editor expansion utilities'
        }
      ]
    } else if (arg == 'PDFUtils') {
      var contextMenuTemplate = [
        {
          label: 'You are in the PDF utilities'
        }
      ]
    } else if (arg == 'matheditor') {
      var contextMenuTemplate = [
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {
          label: 'Math characters',
          click: () => {}
        }
      ]
    } else {
      if (this.state.filepath) {
        var contextMenuTemplate = [
          {
            label: 'External View',
            accelerator: 'CmdOrCtrl+P',
            click: () => this.pdfNewWindow(this.state.filepath.replace('.tex', '.pdf'))
          },
          {
            label: 'External View Only',
            accelerator: 'CmdOrCtrl+Shift+P',
            click: () => {
              this.setState({preview: false})
              this.pdfNewWindow(this.state.filepath.replace('.tex', '.pdf'))
            }
          }
        ]
      } else {
        var contextMenuTemplate = [
          {
            label: 'Toggle PDF Preview Placeholder',
            click: () => this.setState({preview: false})
          }
        ]
      }
    }
    const ContextMenu = Menu.buildFromTemplate(contextMenuTemplate)
    ContextMenu.popup(remote.getCurrentWindow())
  }

  themeChooser (name) {
    setTimeout(() => {
      this.setState({
        theme: name
      })
    }, 100)
  }

  render () {
    let width = this.props.width
    let height = this.props.height
    document.title = 'Infinitex ~TeX~ ' + this.state.filepath
    const pagesRenderedPlusOne = Math.min(this.state.pagesRendered + 1, this.state.numPages)

    // Color themes /////////////////////////
    let previewPDFBackgroundColor = null
    let generalBackgroundColor = null
    let loadingPDFCircleColor = null
    let editorLeftBackgroundColor = null
    let editorDownUtilitiesBackgroundColor = null
    let aceEditorTheme = null
    let editorUtilsColor = null
    let editorUtilsSelectedColor = null
    let letterColor = null
    if (this.state.theme == 'Light') {
      generalBackgroundColor = '#4f4f4f'
      loadingPDFCircleColor = '#000'
      previewPDFBackgroundColor = '#fff'
      editorLeftBackgroundColor = '#fff'
      editorDownUtilitiesBackgroundColor = '#fff'
      editorUtilsColor = '#fff'
      aceEditorTheme = 'light'
      this.infinity = 'Black'
      letterColor = '#000'
			// this.setState({preview:false});
    } else if (this.state.theme == 'Red') {
      generalBackgroundColor = '#000'
      loadingPDFCircleColor = '#ffffff'
      previewPDFBackgroundColor = '#180000'
      editorLeftBackgroundColor = '#180000'
      editorDownUtilitiesBackgroundColor = '#180000'
      editorUtilsColor = '#180000'
      aceEditorTheme = 'red'
      this.infinity = 'White'
      letterColor = '#fff'
    } else if (this.state.theme == 'Green') {
      generalBackgroundColor = '#010a01'
      loadingPDFCircleColor = '#fff'
      previewPDFBackgroundColor = '#062106'
      editorLeftBackgroundColor = '#062106'
      editorDownUtilitiesBackgroundColor = '#062106'
      editorUtilsColor = '#062106'
      aceEditorTheme = 'darkGreen'
      this.infinity = 'White'
      letterColor = '#fff'
    } else if (this.state.theme == 'Purple') {
      generalBackgroundColor = '#1a0116'
      loadingPDFCircleColor = '#fff'
      previewPDFBackgroundColor = '#320f27'
      editorLeftBackgroundColor = '#320f27'
      editorDownUtilitiesBackgroundColor = '#320f27'
      editorUtilsColor = '#320f27'
      aceEditorTheme = 'purple'
      this.infinity = 'White'
      letterColor = '#fff'
    } else {
      generalBackgroundColor = '#111'
      loadingPDFCircleColor = '#fff'
      previewPDFBackgroundColor = '#141414'
      editorLeftBackgroundColor = '#141414'
      editorDownUtilitiesBackgroundColor = '#141414'
      editorUtilsColor = '#141414'
      aceEditorTheme = 'chaos'
      this.infinity = 'White'
      letterColor = '#fff'
    }

    let themeMenu = null
    if (this.state.theme == 'Default') {
      themeMenu =
      <MenuItem
        primaryText="Dark Theme"
        style={{color: '#fff'}}
        checked={true}
        onClick={(e) => this.themeChooser('Light')}
      />
    } else {
      themeMenu =
      <MenuItem
        primaryText="White Theme"
        style={{color: '#fff'}}
        checked={true}
        onClick={(e) => this.themeChooser('Default')}
      />
    }

    // Logo color and source///////////////////////
    let logosrc = null
    let compilePDFLogoSrc = null
    if (this.infinity == 'White') {
      logosrc = '../src/static/infty_white.svg'
      compilePDFLogoSrc = '../src/static/infty_white.svg'
    } else {
      logosrc = '../src/static/infty_black.svg'
      compilePDFLogoSrc = '../src/static/infty_black.svg'
    }

    // The navigation buttons ///////////////////
    const topButton1 = <BottomNavigationItem
      label='Source'
      icon={codeIcon}
      key='t1'
      onClick={() => {
        this.setState({
          textSourceBib: 0
        }, () => {
          this.focusEditor(0)
        })
      }}
    />
    const topButton2 = <BottomNavigationItem
      label='Bibliography'
      icon={biblioIcon}
      key='t2'
      onClick={() => {
        this.setState({
          textSourceBib: 1
        }, () => {
          this.focusEditor(1)
        })
      }}
    />
    const topButton3 = <BottomNavigationItem
      label='Math'
      icon={<EditorFunctions />}
      key='t3'
      onClick={() => {
        this.setState({showmatheditorbox: true})
      }}
    />
    const topButton4Preview = <BottomNavigationItem
      label='Internal'
      icon={previewIcon}
      key='t4P'
      onClick={
        () => {
          this.setState({
            preview: false
          }, () => {
            this.refs.mainEditor.editor.focus()
            if (this.state.filepath !== null) {
               if (shelljs.test('-e', this.state.filepath.replace('.tex', '.pdf'))) {
                 this.pdfNewWindow(this.state.filepath.replace('.tex', '.pdf'))
               }
            }
          })
        }
      }
    />
    const topButton4NoPreview = <BottomNavigationItem
      label='External'
      icon={previewNotIcon}
      key='t4NP'
      onClick={() => {
        this.setState({preview: true})
      }}
    />
    const topButton5 = <BottomNavigationItem
      label='Compile PDF'
      icon={rightarrow}
      key='t5'
      onClick={() => {
        this.compileText()
      }}
    />
    const topButton5NoNetwork = <IconMenu
      iconButtonElement={
        <img
          src={compilePDFLogoSrc}
          style={{
            width: '3vw',
            marginLeft: '10%'
          }}
        />
      }
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      value={0}
      key='t5NN'
    >
      <MenuItem value={1} primaryText='Compile Pdf' style={{color: '#fff'}} onClick={() => this.compileText()} />
      <MenuItem value={2} primaryText='Open Project' style={{color: '#fff'}} onClick={() => this.onOpenProjectClick()} />
      <MenuItem value={3} primaryText='Create Project' style={{color: '#fff'}} onClick={() => this.onCreateProjectClick()} />
      <MenuItem value={4} primaryText='Search Books' style={{color: '#fff'}} onClick={() => this.setState({networkPageIndex: 2, networkFeatures: true, split: false})} />
      <MenuItem value={5} primaryText='Search Papers' style={{color: '#fff'}} onClick={() => this.setState({networkPageIndex: 5, networkFeatures: true, split: false})} />
      <MenuItem value={6} primaryText='Switch to Simple' style={{color: '#fff'}} onClick={() => this.goToSimple()} />
      {themeMenu}
      <MenuItem value={8} primaryText='Help with LaTeX' style={{color: '#fff'}} onClick={() => this.openLatexHelp()} />
      <MenuItem value={9} primaryText='Close Project' style={{color: '#fff'}} onClick={() => this.closeProject()} />
    </IconMenu>
    const bottomButton1 = <BottomNavigationItem
      label='Expansion On'
      icon={networkOnIcon}
      key='b1'
      onClick={() => {
        this.setState({
          networkFeatures: false
        }, () => {
          this.focusEditor(0)
        })
      }}
    />
    const bottomButton1NoNetwork = <BottomNavigationItem
      label='Expansion Off'
      icon={networkOffIcon}
      key='b1NN'
      onClick={() => {
        this.setState({
          networkFeatures: true
        }, () => {
          this.focusEditor(0)
        })
      }}
    />
    const bottomButton1NoNetworkSplit = <BottomNavigationItem
      label='Expansion Off'
      icon={networkOffIcon}
      key='b1NNS'
      onClick={() => {
        this.setState({
          networkFeatures: true,
          split: false,
        }, () => {
          this.focusEditor(0)
        })
      }}
    />
    const bottomButton2 = <BottomNavigationItem
      label='Split View'
      icon={splitIcon}
      key='b2'
      onClick={() => this.setState({
        preview: true,
        split: true,
        networkFeatures: false,
        splitRow: this.state.texRow,
        splitColumn: this.state.texColumn - 1
      }, () => {
        let skata = this.state.packages.split(/\r\n|\r|\n/).length
        this.refs.splitEditor.editor.setOption(
          'firstLineNumber', skata + 1
        )
        let splitSession = this.refs.splitEditor.editor.getSession()
        let splitUndoManager = splitSession.getUndoManager()
        splitUndoManager.reset()
        splitSession.setUndoManager(splitUndoManager)
        setTimeout(() => {
          this.focusEditor(2)
        }, 5)
      })}
    />
    const bottomButton2WildCard = <BottomNavigationItem
      label='Split View'
      icon={splitIcon}
      key='b2'
      onClick={() => this.setState({
        preview: true,
        split: true,
        networkFeatures: false,
        splitRow: this.state.texRow,
        splitColumn: this.state.texColumn - 1
      }, () => {
        let skata = this.state.packages.split(/\r\n|\r|\n/).length
        this.refs.splitEditor.editor.setOption(
          'firstLineNumber', skata + 1
        )
        let splitSession = this.refs.splitEditor.editor.getSession()
        let splitUndoManager = splitSession.getUndoManager()
        splitUndoManager.reset()
        splitSession.setUndoManager(splitUndoManager)
        setTimeout(() => {
          this.focusEditor(2)
        }, 5)
      })}
    />
    const bottomButton2Split = <BottomNavigationItem
      label='No Split'
      icon={splitNotIcon}
      key='b2S'
      onClick={() => this.setState({
        split: false,
      }, () => {
        this.refs.mainEditor.editor.selection.clearSelection()
        this.focusEditor(0)
      })}
    />
    const bottomButton3 = <BottomNavigationItem
      label='Packages'
      icon={extensionIcon}
      key='b3Packages'
      onClick={() => this.setState({
        packageDialog: true
      })}
    />
    const bottomButton4 = <BottomNavigationItem
      label='Add Figure'
      icon={addIcon}
      key='b4figs'
      onClick={() => this.onAddFigureClick()}
    />
    const bottomButtonWildCard = <BottomNavigationItem
      label='Show All'
      icon={openAll}
      key='b5'
      onClick={() => {
        this.setState({
          preview: true,
          networkFeatures: true
        })
      }}
    />
    let literatureSearchResultsHeader = null
    let literatureSearchResultsData = null
    let columnWidth = {}
    let tableWidth = null
    if (this.state.literatureSearchResults !== []) {
      if (this.state.literatureSearchResultsDisplay) {
        literatureSearchResultsHeader =
        <TableRow>
          <TableHeaderColumn colSpan={2}>
            <FlatButton
              label='Shrink Display'
              labelPosition='after'
              icon={previousPageIcon}
              onClick={() =>
                this.setState({literatureSearchResultsDisplay: false}, () => {
                  this.focusEditor(this.state.textSourceBib)
                })
              }
              style={{
                color: '#fff'
              }}
            />
          </TableHeaderColumn>
          <TableHeaderColumn colSpan={3}>
            Title/Author
          </TableHeaderColumn>
        </TableRow>
        columnWidth = {
          title: '20%',
          authors: '20%',
          pages: '10%',
          size: '10%',
          year: '10%'
        }
        tableWidth = width-8
        literatureSearchResultsData =
        this.state.literatureSearchResults.map((row, index) => (
          <TableRow key={index}>
            <TableRowColumn style={{width: columnWidth.title, overflow: 'auto'}}>{this.state.literatureSearchResults[index].title}</TableRowColumn>
            <TableRowColumn style={{width: columnWidth.author, overflow: 'auto'}}>{this.state.literatureSearchResults[index].author}</TableRowColumn>
          </TableRow>
        ))
      } else {
        literatureSearchResultsHeader =
          <TableRow
            style={{
              marginTop: 30,
              textAlign: 'center'
            }}
          >
            <TableHeaderColumn colSpan={1}>
              <FlatButton
                label='Show Table'
                labelPosition='before'
                icon={nextPageIcon}
                onClick={() => this.setState({literatureSearchResultsDisplay: true})}
                style={{
                  color: '#fff'
                }}
              />
            </TableHeaderColumn>
          </TableRow>
        tableWidth = width / 5.9
        // literatureSearchResultsData =
        // this.state.literatureSearchResults.map((row, index) => (
        //   <TableRow key={index}>
        //     <TableRowColumn>
        //       {this.state.literatureSearchResults[index].title}
        //     </TableRowColumn>
        //   </TableRow>
        // ))
      }
    }

    let networkSearchOrResumeTable = null
    if (this.state.literatureSearchResults.length == 0) {
      networkSearchOrResumeTable =
      <div>
        <RaisedButton
          onClick={
            () => {
              this.setState({networkPageIndex: 3}, () => {
                if (this.state.filepath) {
                  if (this.state.preview) {
                    this.setState({
                      preview: false
                    })
                  }
                }
              })
            }
          }
          label='Search Books'
          labelPosition='after'
          icon={searchIcon}
          buttonStyle={buttonStyles}
          style={{width: '90%', marginTop: '30%'}}
        />
      </div>
    } else {
      networkSearchOrResumeTable =
      <div>
        <RaisedButton
          onClick={
            () => {
              this.setState({
                networkPageIndex: 3
              }, () => {
                if (this.state.filepath) {
                  if (this.state.preview) {
                    this.setState({
                      preview: false
                    })
                  }
                }
              })
            }
          }
          label='Search Books'
          labelPosition='after'
          icon={searchIcon}
          buttonStyle={buttonStyles}
          style={{width: '90%', marginTop: '30%'}}
        />
        <RaisedButton
          onClick={() => this.setState({
            networkPageIndex: 4,
            literatureSearchResultsDisplay: true
          })}
          label='Last Book Search'
          labelPosition='after'
          icon={previousPageIcon}
          keyboardFocused
          buttonStyle={buttonStyles}
          style={{width: '90%', marginTop: '10%'}}
        />
      </div>
    }
    let literatureDialog = null
    let downloadButtonLabel = null
    if (!this.state.filepath) {
      downloadButtonLabel =
      'Go to Download URL'
    } else {
      let fsresolver = null
      if (process.platform == 'win32') {
        fsresolver = '\\'
      } else {
        fsresolver = '/'
      }
      if (this.state.literatureSearchResultsSelectedDisplay && shelljs.test('-e', this.state.filepath.replace(
        this.state.filepath.slice(this.state.filepath.lastIndexOf(fsresolver) + 1, this.state.filepath.length),
        'Literature') + fsresolver + (
        this.state.literatureSearchResults[
          this.state.literatureSearchResultsSelectedIndex
        ].title).replace(/ /g, '_') + '.' +
        this.state.literatureSearchResults[
          this.state.literatureSearchResultsSelectedIndex
        ].extension)
      ) {
        downloadButtonLabel =
        'Open File'
      } else {
        downloadButtonLabel =
        'Download'
      }
    }
    let literatureAbstractActions = [
      <FlatButton
        label='Add Citation'
        labelStyle={{color: letterColor}}
        onClick={
          () => {
            if (this.state.filepath !== null) {
              this.setState({
                literatureSearchResultsSelectedDisplay: false,
                citationNicknameDialogDisplay: true
              })
            } else {
              this.createCitationFromLiterature()
            }
          }
        }
      />,
      <FlatButton
        label={downloadButtonLabel}
        keyboardFocused
        labelStyle={{color: letterColor}}
        onClick={() =>
          this.downloadLiterature()
        }
      />
    ]
    if (this.state.literatureSearchResultsSelectedDisplay) {
      literatureDialog =
      <Dialog
        modal={false}
        title={this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].title}
        open={this.state.literatureSearchResultsSelectedDisplay}
        actions={literatureAbstractActions}
        onRequestClose={
          () => {
            this.setState({
              literatureSearchResultsSelectedDisplay: false
            }, () => {
              if (!this.state.literatureSearchResultsDisplay) {
                this.focusEditor(this.state.textSourceBib)
              }
            })
          }
        }
        autoScrollBodyContent
        paperStyle={{
          padding: 10
        }}
        bodyStyle={{
          backgroundColor: previewPDFBackgroundColor,
          color: letterColor
        }}
        contentStyle={{
          maxWidth: 'none',
          width: '100%',
          maxHeight: '90%',
          height: '80%'
        }}
        actionsContainerStyle={{
          backgroundColor: previewPDFBackgroundColor,
          color: letterColor
        }}
        titleStyle={{
          backgroundColor: previewPDFBackgroundColor,
          color: letterColor
        }}
      >
        <div style={{display: 'inline-flex', justifyContent: 'space-around'}}>
          <div style={{display: 'block'}}>
            <img
              src={'http://gen.lib.rus.ec/covers/' + this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].coverurl}
              alt={'Cover Image'}
              style={{
                maxWidth: width * 0.25,
                maxHeight: height * 0.4,
                marginRight: 30
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html:
                  'Pages: ' + this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].pagesinfile
              }} />
            <div
              dangerouslySetInnerHTML={{
                __html:
                  'Size: ' + ((this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].filesize) / (1024 * 1024)).toFixed(2) + ' MB\n'
              }} />
            <div
              dangerouslySetInnerHTML={{
                __html:
                  'Year: ' + this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].year
              }} />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                this.state.literatureSearchResults[this.state.literatureSearchResultsSelectedIndex].descr
            }} />
        </div>
      </Dialog>
    }
    let citationNicknameDialogActions = [
      <FlatButton
        label='Cancel'
        labelStyle={{color: letterColor}}
        onClick={() => {
          this.setState({
            citationNicknameDialogDisplay: false,
            literatureSearchResultsSelectedDisplay: true
          })
        }}
      />,
      <FlatButton
        label='OK'
        labelStyle={{color: letterColor}}
        onClick={() => {
          if (this.state.citationNickname !== '') {
            this.setState({
              citationNicknameDialogDisplay: false
            }, () => {
              this.createCitationFromLiterature()
            })
          }
        }}
      />
    ]

    let networkstuff = null
    let infIconPageNavigation = null
    if (this.state.networkPageIndex == 0) {
      // Loading Screen
      infIconPageNavigation = 0
      networkstuff =
      <div>
        <CircularProgress
          size={80}
          thickness={9}
          color={loadingPDFCircleColor}
          style={{marginLeft: 0, marginRight: 0, marginTop: '30%'}}
      />
      </div>
    } else if (this.state.networkPageIndex == 1) {
      infIconPageNavigation = 2
      // Starter Icon
    } else if (this.state.networkPageIndex == 2) {
      // Citation or Literature
      infIconPageNavigation = 1
      networkstuff =
      <div>
        {networkSearchOrResumeTable}
      </div>
    } else if (this.state.networkPageIndex == 3) {
      // Download
      infIconPageNavigation = 2
      networkstuff =
      <div style={{marginTop: '50%'}}>
        <TextField
          value={this.state.paperKeyword}
          autoFocus
          onChange={(e) => this.setState({paperKeyword: e.target.value})}
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              this.setState({networkPageIndex: 0})
              this.onSearchDownloadBook()
            }
          }}
          onBlur={() => this.setState({networkPageIndex: 2})}
          hintText={'Library Genesis'}
          hintStyle={{ width: '90%', color: letterColor}}
          inputStyle={{
            fontSize: '12pt',
            color: letterColor
          }}
          style={{
            width: '90%'
          }}
        />
      </div>
    } else if (this.state.networkPageIndex == 4) {
      infIconPageNavigation = 1
      networkstuff =
      <div>
        <Table
          fixedHeader
          selectable
          multiSelectable={false}
          style={{
            tableLayout: 'auto'
          }}
          bodyStyle={{
            width: tableWidth,
            height: height-230,
          }}
          onRowSelection={(rows) => this.setState({
            literatureSearchResultsSelectedIndex: rows,
            literatureSearchResultsSelectedDisplay: true
          })}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            {literatureSearchResultsHeader}
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway
            showRowHover
            stripedRows={false}
          >
            {literatureSearchResultsData}
          </TableBody>
        </Table>
      </div>
    } else if (this.state.networkPageIndex == 5) {
      infIconPageNavigation = 2
      networkstuff =
      <div style={{marginTop: '50%'}}>
        <TextField
          value={this.state.paperKeyword}
          autoFocus
          onChange={(e) => this.setState({paperKeyword: e.target.value})}
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              this.setState({networkPageIndex: 1})
              this.onSearchDownloadPaper()
            }
          }}
          onBlur={() => this.setState({networkPageIndex: 5})}
          hintText={'SciMag'}
          hintStyle={{ width: '90%', color: letterColor}}
          inputStyle={{
            fontSize: '12pt',
            color: letterColor
          }}
          style={{
            width: '90%'
          }}
        />
      </div>
    } else {
      infIconPageNavigation = 3
      networkstuff =
      <div>
        <LinearProgress
          mode='determinate'
          value={this.state.downloadProgress}
          min={0}
          max={100}
          color={loadingPDFCircleColor}
          style={{marginLeft: 0, marginRight: 0, marginTop: '30%'}}
        />
        <TextField
          value={'Downloading Updates'}
          id='Pare ta arxidia Material UI'
          disabled
          inputStyle={{
            fontSize: '12pt',
            textAlign: 'center',
            color: letterColor
          }}
          style={{
            width: '90%'
          }}
        />
      </div>
    }


    let texEditorHeight = null
    let separateTexBibHeight = 0
    let bibEditorHeight = 0
    if (this.state.textSourceBib == 0) {
      texEditorHeight = height
    } else {
      texEditorHeight = height - 202
      separateTexBibHeight = 3
      bibEditorHeight = 200
    }

    let layout = []
    let divEditorStyle = {}
    let divPDFStyle = {}
    let divNetworkStyle = {}

    let editorWidth = null
    let networkWidth = null
    let editorLeft = null
    let editorUpUtilities = null
    let editorDownUtilities = null
    let logoIconDiv = null
    let PreviewPDF = null
    let PDFContainerHeight = null
    let PDFUtils = null

    if (this.state.literatureSearchResultsDisplay) {
      networkWidth = width - 8
      layout = [
        {i: 'loginchat', x: 0, y: 0, w: 3, h: 4, static: true},
        {i: 'editor', x: 300, y: 0, w: 3, h: 4, static: true},
        {i: 'pdf', x: 300, y: 0, w: 3, h: 4, static: true}
      ]
      divPDFStyle = {
        display: 'none',
        width: 0,
        height: 0,
        zDepth: 0
      }
      divEditorStyle = {
        display: 'none',
        width: 0,
        height: 0,
        zDepth: 0
      }
      logoIconDiv =
      <IconMenu
        iconButtonElement={
          <img style={{width: 130, marginTop: 30, cursor: 'pointer'}} src={logosrc} />
        }
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        value={0}
      >
        <MenuItem value={1} primaryText='Open Project' style={{color: '#fff'}} onClick={() => this.onOpenProjectClick()} />
        <MenuItem value={2} primaryText='Create Project' style={{color: '#fff'}} onClick={() => this.onCreateProjectClick()} />
        <MenuItem value={3} primaryText='Search Books' style={{color: '#fff'}} onClick={() => this.editorLeftClickWithLiteratureDisplay(infIconPageNavigation)} />
        <MenuItem value={4} primaryText='Search Papers' style={{color: '#fff'}} onClick={() => this.setState({networkPageIndex: 5})} />
        <MenuItem value={5} primaryText='Switch to Simple' style={{color: '#fff'}} onClick={() => this.goToSimple()} />
        {themeMenu}
        <MenuItem value={6} primaryText='Help with LaTeX' style={{color: '#fff'}} onClick={() => this.openLatexHelp()} />
        <MenuItem value={7} primaryText='Close Project' style={{color: '#fff'}} onClick={() => this.closeProject()} />
      </IconMenu>
      editorLeft =
      <Paper
        style={{
          height: height,
          width: networkWidth,
          textAlign: 'center',
          backgroundColor: editorLeftBackgroundColor
        }}
        zDepth={1}>
        <div>
          {logoIconDiv}
          {networkstuff}
        </div>
      </Paper>
    } else {
      logoIconDiv =
      <IconMenu
        iconButtonElement={
          <img style={{width: 130, marginTop: 30, cursor: 'pointer'}} src={logosrc} />
        }
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        value={0}
      >
        <MenuItem value={1} primaryText='Open Project' style={{color: '#fff'}} onClick={() => this.onOpenProjectClick()} />
        <MenuItem value={2} primaryText='Create Project' style={{color: '#fff'}} onClick={() => this.onCreateProjectClick()} />
        <MenuItem value={3} primaryText='Search Books' style={{color: '#fff'}} onClick={() => this.editorLeftClickWithoutLiteratureDisplay(infIconPageNavigation)} />
        <MenuItem value={4} primaryText='Search Papers' style={{color: '#fff'}} onClick={() => this.setState({networkPageIndex: 5})} />
        <MenuItem value={5} primaryText='Switch to Simple' style={{color: '#fff'}} onClick={() => this.goToSimple()} />
        {themeMenu}
        <MenuItem value={6} primaryText='Help with LaTeX' style={{color: '#fff'}} onClick={() => this.openLatexHelp()} />
        <MenuItem value={7} primaryText='Close Project' style={{color: '#fff'}} onClick={() => this.closeProject()} />
      </IconMenu>
      if (this.state.preview) {
        if (this.state.split) {
          layout = [
            {i: 'editor', x: 0, y: 0, w: 3, h: 4, static: true},
            {i: 'pdf', x: 148, y: 0, w: 3, h: 4, static: true},
            {i: 'loginchat', x: 300, y: 0, w: 3, h: 4, static: true}
          ]
          divNetworkStyle = {
            display: 'none',
            width: 0,
            height: 0,
            zDepth: 0
          }
          editorWidth = (0.99 * width / 2)
          this.PDFWidth = (0.99 * width / 2)
          PDFContainerHeight = height-55
          PreviewPDF = <AceEditor
            mode='tex'
            theme={aceEditorTheme}
            snippets='tex'
            name='splitEditor'
            ref='splitEditor'
            enableBasicAutocompletion
            enableLiveAutocompletion
            wrapEnabled
            editorProps={{
              $blockScrolling: Infinity
            }}
            width={(editorWidth + 5).toString() + 'px'}
            height={(PDFContainerHeight).toString() + 'px'}
            fontSize={14}
            value={this.state.texfilecontent}
            setOptions={{
              enableSnippets: true,
              behavioursEnabled: true,
              cursorStyle: 'smooth',
              useWorker: false,
              showPrintMargin: false
            }}
            onChange={this.updateSplitInput.bind(this)}
            onFocus={this.onFocusSplitEditor.bind(this)}
          />
          editorUpUtilities =
          <Paper
            style={{
              width: editorWidth + 5
            }}
          >
            <BottomNavigation
              selectedIndex={this.state.textSourceBib}
              style={{
                backgroundColor: editorUtilsColor
              }}
            >
              {
                [
                  topButton1,
                  topButton2,
                  topButton3,
                  topButton4Preview,
                  topButton5NoNetwork
                ]
              }
            </BottomNavigation>
          </Paper>
          editorDownUtilities =
          <Paper
            style={{
              width: editorWidth,
              textAlign: 'right'
            }}>
            <BottomNavigation
              style={{
                width: editorWidth + 5,
                backgroundColor: editorDownUtilitiesBackgroundColor
              }}
    				>
              {
                [
                  bottomButton1NoNetworkSplit,
                  bottomButton2Split,
                  bottomButton3,
                  bottomButton4
                ]
              }
            </BottomNavigation>
          </Paper>
        } else {
          if (this.state.networkFeatures) {
            layout = [
              {i: 'loginchat', x: 0, y: 0, w: 3, h: 4, static: true},
              {i: 'editor', x: 51, y: 0, w: 3, h: 4, static: true},
              {i: 'pdf', x: 191, y: 0, w: 3, h: 4, static: true}
            ]
            editorWidth = width / 2.13
            this.PDFWidth = width / 2.85
            networkWidth = width / 5.9
            editorUpUtilities =
              <Paper
                style={{
      						width: editorWidth + 5
      					}}
      				>
                <BottomNavigation
                  selectedIndex={this.state.textSourceBib}
                  style={{
                		backgroundColor: editorUtilsColor
                	}}
                >
                  {
                    [
                      topButton1,
                      topButton2,
                      topButton3,
                      topButton4Preview,
                      topButton5
                    ]
                  }
                </BottomNavigation>
              </Paper>
              editorLeft =
              <Paper
                style={{
                  height: height,
                  width: networkWidth,
                  textAlign: 'center',
                  backgroundColor: editorLeftBackgroundColor
                }}
                zDepth={1}>
                <div>
                  {logoIconDiv}
                  {networkstuff}
                </div>
              </Paper>
              editorDownUtilities =
              <Paper
                style={{
                  width: editorWidth,
                  textAlign: 'right'
                }}>
                <BottomNavigation
                  style={{
                    width: editorWidth + 5,
                    backgroundColor: editorDownUtilitiesBackgroundColor
                  }}
        				>
                  {
                    [
                      bottomButton1,
                      bottomButton2,
                      bottomButton3,
                      bottomButton4
                    ]
                  }
                </BottomNavigation>
              </Paper>
          } else {
            layout = [
              {i: 'editor', x: 0, y: 0, w: 3, h: 4, static: true},
              {i: 'pdf', x: 196, y: 0, w: 3, h: 4, static: true},
            	{i: 'loginchat', x: 300, y: 0, w: 3, h: 4, static: true}
            ]
            divNetworkStyle = {
            	display: 'none',
            	width: 0,
            	height: 0,
            	zDepth: 0
            }
            editorWidth = (1.32 * width / 2)
            this.PDFWidth = (0.669 * width / 2)
            editorUpUtilities =
            <Paper
              style={{
    						width: editorWidth + 5
    					}}
            >
              <BottomNavigation
                selectedIndex={this.state.textSourceBib}
                style={{
    							backgroundColor: editorUtilsColor
    						}}
    					>
                {
                  [
                    topButton1,
                    topButton2,
                    topButton3,
                    topButton4Preview,
                    topButton5NoNetwork
                  ]
                }
              </BottomNavigation>
            </Paper>
            editorDownUtilities =
            <Paper
              style={{
                width: editorWidth,
                backgroundColor: editorDownUtilitiesBackgroundColor,
                textAlign: 'right'
              }}>
              <BottomNavigation
                style={{
                  width: editorWidth + 5,
                  backgroundColor: editorDownUtilitiesBackgroundColor
                }}
    					>
                {
                  [
                    bottomButton1NoNetwork,
                    bottomButton2,
                    bottomButton3,
                    bottomButton4
                  ]
                }
              </BottomNavigation>
            </Paper>
          }
          if (this.state.filepath) {
            PDFContainerHeight = height - 55
            if (this.state.PDFLoading) {
              PreviewPDF =
                <div style={{
                  position: 'relative',
                  backgroundColor: previewPDFBackgroundColor
                }}>
                  <CircularProgress
                    size={100}
                    thickness={8}
                    color={loadingPDFCircleColor}
                    style={{marginLeft: 0, marginRight: 0, marginTop: '30%'}}
      						/>
                </div>
            } else {
              if (shelljs.test('-e', this.state.filepath.replace('.tex', '.pdf')) && !this.latexError) {
                PreviewPDF =
                  <div
                    style={{
                      backgroundColor: previewPDFBackgroundColor
                    }}
                  >
                    <Document
                      file={{data: `data:application/pdf;base64,${this.state.binaryPDFContent}`}}
                      onLoadSuccess={(pdf) => {
                        this.onDocumentLoadSuccess(pdf.numPages)
                      }}
                      className='pdfPreview'
                      rotate={0}
                      onLoadError={() => {
                        this.setState({
                          PDFLoading: true
                        }, () => {
                          ipcRenderer.send('openPDF', this.state.filepath.replace('.tex', '.pdf'))
                        })
                      }}
                      loading={
                        <CircularProgress
                          size={100}
                          thickness={8}
                          color={loadingPDFCircleColor}
                          style={{marginLeft: 0, marginRight: 0, marginTop: '30%'}}
                        />
                      }
                      >
                      <Page
                        key={`page_${this.state.pageIndex + 1}`}
                        width={this.PDFWidth}
                        pageNumber={this.state.pageIndex + 1}
                        renderAnnotations
                        className='pdfPage'
                        renderMode='svg'
                      />
                      <FakePage
                        pages={Math.min(this.state.numPages, this.state.pageIndex + 20)}
                        width={this.PDFWidth}
                      />
                    </Document>
                  </div>
                  let p = this.state.pageIndex + 1
                  PDFUtils =
                  <div onContextMenu={(e) => {
          					this.contextMenuBuilder(e, 'PDFUtils')
          				}}>
                    <Paper
                      style={{
          							width: '100%'
          						}}
        						>
                      <BottomNavigation
                        style={{
          								backgroundColor: editorDownUtilitiesBackgroundColor
          							}}
        							>
                      <BottomNavigationItem
                        icon={previousPageIcon}
                        onClick={() => this.previousPage()}
                      />
                      <div
                        style={{
                          color: letterColor,
                          marginTop: 19
                        }}
                        dangerouslySetInnerHTML={{
                          __html: p + '/' + this.state.numPages
                        }}
                      />
                      <BottomNavigationItem
                        icon={nextPageIcon}
                        onClick={() => this.nextPage()}
                      />
                    </BottomNavigation>
                  </Paper>
                </div>
              } else {
                if (this.latexError) {
                  PreviewPDF =
                  <div
                    style={{
                      width: this.PDFWidth,
                      height: '100%',
                      backgroundColor: '#811414',
                      color: '#fff',
                      textAlign: 'left'
                    }}
                    >
                    <article
                      dangerouslySetInnerHTML={{
                        __html: this.latexError
                      }}
                    />
                  </div>
                }
              }
            }
          } else {
            PDFContainerHeight = height - 55
            PreviewPDF =
            <Paper
              style={{
                height: height - 55,
                width: this.PDFWidth,
                backgroundColor: previewPDFBackgroundColor,
                padding: 5
              }}
    			  />
            PDFUtils =
            <div onContextMenu={(e) => {
              this.contextMenuBuilder(e, 'PDFUtils')
            }}>
              <Paper
                style={{
                  width: '100%'
                }}
    					>
                <BottomNavigation
                  style={{
                    backgroundColor: editorDownUtilitiesBackgroundColor
                  }}
    						>
                  <BottomNavigationItem
                    icon={openProjectIcon}
                    onClick={() => {
                      this.onOpenProjectClick()
                    }}
    							/>
                </BottomNavigation>
              </Paper>
            </div>
          }
        }
      } else {
        if (this.state.networkFeatures) {
          layout = [
          	{i: 'loginchat', x: 0, y: 0, w: 3, h: 4, static: true},
            {i: 'editor', x: 51, y: 0, w: 3, h: 4, static: true},
          	{i: 'pdf', x: 300, y: 0, w: 3, h: 4, static: true}
          ]
          divPDFStyle = {
          	display: 'none',
          	width: 0,
          	height: 0,
          	zDepth: 0
          }
          editorWidth = (4.117 * width) / 5
          networkWidth = width / 5.9
          editorUpUtilities =
          <Paper
            style={{
              width: editorWidth + 5
            }}
					>
            <BottomNavigation
              selectedIndex={this.state.textSourceBib}
              style={{
                backgroundColor: editorUtilsColor
              }}
						>
              {
                [
                  topButton1,
                  topButton2,
                  topButton3,
                  topButton4NoPreview,
                  topButton5
                ]
              }
            </BottomNavigation>
          </Paper>
          editorDownUtilities =
          <Paper
            style={{
              width: editorWidth,
              backgroundColor: editorDownUtilitiesBackgroundColor,
              textAlign: 'right'
            }}>
            <BottomNavigation
              style={{
                width: editorWidth + 5,
                backgroundColor: editorDownUtilitiesBackgroundColor
              }}
  					>
              {
                [
                  bottomButton1,
                  bottomButton2,
                  bottomButton3,
                  bottomButton4
                ]
              }
            </BottomNavigation>
          </Paper>
          editorLeft =
          <Paper
            style={{
              height: height,
              width: networkWidth,
              textAlign: 'center',
              backgroundColor: editorLeftBackgroundColor
            }}
            zDepth={1}>
            <div>
              {logoIconDiv}
              {networkstuff}
            </div>
          </Paper>
        } else {
          layout = [
            {i: 'editor', x: 0, y: 0, w: 3, h: 4, static: true},
          	{i: 'pdf', x: 10, y: 0, w: 3, h: 4, static: true},
          	{i: 'loginchat', x: 300, y: 0, w: 3, h: 4, static: true}
          ]
          divPDFStyle = {
          	display: 'none',
          	width: 0,
          	height: 0,
          	zDepth: 0
          }
          divNetworkStyle = {
          	display: 'none',
          	width: 0,
          	height: 0,
          	zDepth: 0
          }
          editorWidth = width - 5
          editorUpUtilities =
          <Paper
            style={{
              width: editorWidth + 5
            }}
					>
            <BottomNavigation
              selectedIndex={this.state.textSourceBib}
              style={{
                backgroundColor: editorUtilsColor
              }}
						>
              {
                [
                  topButton1,
                  topButton2,
                  topButton3,
                  topButton4NoPreview,
                  topButton5NoNetwork
                ]
              }

            </BottomNavigation>
          </Paper>
          editorDownUtilities =
          <Paper
            style={{
              width: editorWidth,
              backgroundColor: editorDownUtilitiesBackgroundColor,
              textAlign: 'right'
            }}>
            <BottomNavigation
              style={{
                width: editorWidth + 5,
                backgroundColor: editorDownUtilitiesBackgroundColor
              }}
  					>
              {
                [
                  bottomButton1NoNetwork,
                  bottomButton2WildCard,
                  bottomButtonWildCard,
                  bottomButton3,
                  bottomButton4
                ]
              }
            </BottomNavigation>
          </Paper>
        }
      }
    }

    // The Dialog Buttons
    const mathEditorButtons = [
      <FlatButton
        label='Compile Math'
        labelStyle={{color: letterColor}}
        onClick={this.compileMathEditor.bind(this)}
      />,
      <FlatButton
        label='Paste to main text'
        keyboardFocused
        labelStyle={{color: letterColor}}
        onClick={
          () => {
            this.setState({
              showpastematheditorbox: true
            })
          }
				}
      />
    ]

    let packageEditorButtons = [
      <FlatButton
        label='Ok'
        labelStyle={{color: letterColor}}
        keyboardFocused
        onClick={() => {
          this.setState({
            packageDialog: false
          }, () => {
            if (!this.state.preview) {
              this.focusEditor(0)
            }
          })
        }}
      />,
      <FlatButton
        label='Ok & Compile'
        labelStyle={{color: letterColor}}
        onClick={() => {
          this.setState({
            packageDialog: false
          }, () => {
            this.compileText()
          })
        }}
      />
    ]

    let areYouSureButtons = [
      <FlatButton
        label='Cancel'
        labelStyle={{color: letterColor}}
        keyboardFocused
        onClick={() => {
          this.setState({
            areYouSureDialogDisplay: false
          }, () => {
            this.focusEditor(0)
          })
        }}
      />,
      <FlatButton
        label='OK'
        labelStyle={{color: letterColor}}
        onClick={() => {
          this.setState({
            filepath: null,
            numPages: null,
            pageIndex: null,
            binaryPDFContent: null,
            matheditorinput: '',
            areYouSureDialogDisplay: false
          }, () => {
            this.starterEditor()
            this.focusEditor(0)
          })
        }}
      />
    ]

    let areYouSureTemplateButtons = [
      <FlatButton
        label='Cancel'
        labelStyle={{color: letterColor}}
        keyboardFocused
        onClick={() => {
          this.setState({
            areYouSureTemplateDialogDisplay: false
          }, () => {
            this.focusEditor(0)
          })
        }}
      />,
      <FlatButton
        label='OK'
        labelStyle={{color: letterColor}}
        onClick={() => {
          this.setState({
            filepath: null,
            areYouSureTemplateDialogDisplay: false
          }, () => {
            this.initTemplate(this.templateArg)
          })
        }}
      />
    ]

    // The dialogs:
    let mathEditorDialog =
    <Dialog
      title='Math Editor'
      actions={mathEditorButtons}
      modal={false}
      open={this.state.showmatheditorbox}
      onRequestClose={
        () => {
          this.setState({showmatheditorbox: false}, () => {
            if (!this.state.filepath) {
              this.setState({
                preview: true
              })
            }
          })
          this.focusEditor(this.state.textSourceBib)
        }
      }
      bodyStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      actionsContainerStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      titleStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
    >
    <div onContextMenu={(e) => {
      this.contextMenuBuilder(e, 'matheditor')
    }}>
      <AceEditor
        mode='tex'
        theme={aceEditorTheme}
        snippets='tex'
        name='mathEditor'
        ref='mathEditor'
        enableBasicAutocompletion
        enableLiveAutocompletion
        wrapEnabled
        editorProps={{
          $blockScrolling: Infinity
        }}
        fontSize={14}
        value={this.state.matheditorinput}
        setOptions={{
          enableSnippets: true,
          behavioursEnabled: true,
          cursorStyle: 'smooth',
          useWorker: false,
          showPrintMargin: false
        }}
        onChange={this.updateMathEditorInput.bind(this)}
       />
     </div>
    </Dialog>
    let packageDialog =
    <Dialog
      title='Edit Packages'
      actions={packageEditorButtons}
      modal={false}
      open={this.state.packageDialog}
      onRequestClose={
				() => {
          this.setState({packageDialog: false}, () => {
            if (!this.state.filepath) {
              this.setState({
                preview: true
              })
            }
            if (!this.state.preview) {
              this.focusEditor(this.state.textSourceBib)
            }
          })
        }
			}
      bodyStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      actionsContainerStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      titleStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      contentStyle={{
        width: '70%',
        maxWidth: 'none',
        height: '70%',
        maxHeight: 'none',
        textAlign: 'center'
      }}
    >
      <AceEditor
        mode='tex'
        theme={aceEditorTheme}
        snippets='tex'
        name='packageEditor'
        ref='packageEditor'
        focus
        enableBasicAutocompletion
        enableLiveAutocompletion
        wrapEnabled
        editorProps={{
          $blockScrolling: Infinity
        }}
        fontSize={14}
        value={this.state.packages}
        width={'70%'}
        wrapEnabled
        setOptions={{
          enableSnippets: true,
          behavioursEnabled: true,
          cursorStyle: 'smooth',
          useWorker: false,
          showPrintMargin: false
        }}
        onChange={this.updatePackages.bind(this)}
			/>
    </Dialog>
    let mathPreviewDialog =
    <Dialog
      modal={false}
      open={this.state.showmathpreviewbox}
      onRequestClose={
				() => {
          this.setState({showmathpreviewbox: false})
          this.focusEditor(this.state.textSourceBib)
        }
			}
      autoScrollBodyContent
      bodyStyle={{backgroundColor: previewPDFBackgroundColor, color: letterColor}}
		>
      <div dangerouslySetInnerHTML={{__html: this.state.mathhtml}} />
    </Dialog>
    let mathPasteDialog =
    <Dialog
      title='Paste Math'
      modal={false}
      open={this.state.showpastematheditorbox}
      onRequestClose={
  			() => {
          this.setState({showpastematheditorbox: false})
        }
			}
      bodyStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      actionsContainerStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      titleStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      autoScrollBodyContent
    >
      <RadioButtonGroup
        name='PasteMethods'
        defaultSelected='not_light'
        onChange={
					(event) => {
              event.persist()
              this.setState({
                matheditorinput: mathOneLiner(this.state.matheditorinput)
              }, () => {
                let cursor = this.refs.mainEditor.editor.selection.getCursor()
                if (event.target.value === 'Inline') {
                  this.setState({
                    showmatheditorbox: false,
                    showpastematheditorbox: false
                  }, () => {
                    this.refs.mainEditor.editor.insert(' $' + this.state.matheditorinput + '$ \n')
                    this.setState({
                      texRow: cursor.row + 1,
                      texColumn: cursor.column,
                      matheditorinput: reverseMathOneLiner(this.state.matheditorinput)
                    }, () => {
                      this.focusEditor(0)
                    })
                  })
                } else if (event.target.value === 'NewLine') {
                  this.setState({
                    showmatheditorbox: false,
                    showpastematheditorbox: false
                  }, () => {
                    this.refs.mainEditor.editor.insert('\n$$\n\t' + this.state.matheditorinput + '\n$$\n')
                    this.setState({
                      texRow: cursor.row + 4,
                      texColumn: cursor.column,
                      matheditorinput: reverseMathOneLiner(this.state.matheditorinput)
                    }, () => {
                      this.focusEditor(0)
                    })
                  })
                } else {
                  this.setState({
                    showmatheditorbox: false,
                    showpastematheditorbox: false
                  }, () => {
                    this.refs.mainEditor.editor.insert('\n\\begin{equation}\n\t' + this.state.matheditorinput + '\n\\end{equation}\n')
                    this.setState({
                      texRow: cursor.row + 4,
                      texColumn: cursor.column,
                      matheditorinput: reverseMathOneLiner(this.state.matheditorinput)
                    }, () => {
                      this.focusEditor(0)
                    })
                  })
                }
              })
            }
					}
				>
        <RadioButton
          label='Inline Paste'
          value='Inline'
          labelStyle={{
            color: letterColor
          }}
          inputStyle={{
            color: letterColor
          }}
				/>
        <RadioButton
          label='New Line Paste'
          value='NewLine'
          labelStyle={{
            color: letterColor
          }}
          inputStyle={{
            color: letterColor
          }}
				/>
        <RadioButton
          label='Paste as Enumerated Equation'
          value='EnumeratedEquation'
          labelStyle={{
            color: letterColor
          }}
          inputStyle={{
            color: letterColor
          }}
				/>
      </RadioButtonGroup>
    </Dialog>
    let citationDialog =
    <Dialog
      modal
      title={'Citation Nickname'}
      open={this.state.citationNicknameDialogDisplay}
      actions={citationNicknameDialogActions}
      onRequestClose={
        () => {
          this.setState({
            citationNicknameDialogDisplay: false,
            literatureSearchResultsSelectedDisplay: true
          })
        }
      }
      autoScrollBodyContent
      bodyStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      contentStyle={{
        maxWidth: 'none',
        width: '80%',
        maxHeight: 'none',
        height: '90%'
      }}
      actionsContainerStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      titleStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
    >
      <div>
            Write the nickname by which you will refer to this piece of literature.
            Whenever you want to cite this, you can write {'\n'}\citep{'\u007B' + this.state.citationNickname + '\u007D '}
            for citation with parenthesis and {'\n'}\citet{'\u007B' + this.state.citationNickname + '\u007D'} for textual
            citation.{'\n'}Do not forget to include just before the end document command the bibliography command with
            the correct name of the bib file, as in the Thesis Template.
          </div>
      <div>
        <TextField
          value={this.state.citationNickname}
          onChange={(e) => this.setState({citationNickname: e.target.value})}
          autoFocus
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              this.setState({
                citationNicknameDialogDisplay: false,
                literatureSearchResultsSelectedDisplay: true
              }, () => {
                this.createCitationFromLiterature()
              })
            }
          }}
          hintText={'Enter Nickname'}
          hintStyle={{ width: '90%', color: letterColor}}
          inputStyle={{
            fontSize: '12pt',
            color: letterColor
          }}
          style={{
            width: '90%'
          }}
        />
      </div>
    </Dialog>
    let areYouSureTemplateDialog =
    <Dialog
      modal
      title={'Are you sure?'}
      open={this.state.areYouSureTemplateDialogDisplay}
      actions={areYouSureTemplateButtons}
      onRequestClose={
        () => {
          this.setState({
            areYouSureTemplateDialogDisplay: false
          })
        }
      }
      autoScrollBodyContent
      bodyStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      contentStyle={{
        maxWidth: 'none',
        width: '50%',
        maxHeight: 'none',
        height: '50%'
      }}
      actionsContainerStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      titleStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      >
        By choosing a template you will leave the current working directory.
        If this is what you want, please make sure you have saved all your work.
    </Dialog>
    let areYouSureDialog =
    <Dialog
      modal
      title={'Are you sure?'}
      open={this.state.areYouSureDialogDisplay}
      actions={areYouSureButtons}
      onRequestClose={
        () => {
          this.setState({
            areYouSureDialogDisplay: false
          })
        }
      }
      autoScrollBodyContent
      bodyStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      contentStyle={{
        maxWidth: 'none',
        width: '50%',
        maxHeight: 'none',
        height: '50%'
      }}
      actionsContainerStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      titleStyle={{
        backgroundColor: previewPDFBackgroundColor,
        color: letterColor
      }}
      >
        Are you sure you want to quit the project? Before you do, make sure you have
        saved everything or your changes will be lost!
    </Dialog>

	  return (
      <div style={{width: width - 20, height: height, backgroundColor: generalBackgroundColor}}>
        {mathEditorDialog}
        {packageDialog}
        {mathPreviewDialog}
        {mathPasteDialog}
        {literatureDialog}
        {citationDialog}
        {areYouSureTemplateDialog}
        {areYouSureDialog}
        <ReactGridLayout
          className='layout'
          layout={layout}
          margin={[0, 0]}
          cols={300}
          rowHeight={0}
          width={width + 25}>
          <div key={'loginchat'} style={divNetworkStyle} onContextMenu={(e) => {
            this.contextMenuBuilder(e, 'loginchat')
          }}>
            {editorLeft}
          </div>
          <div key={'editor'} style={divEditorStyle}>
            <div onContextMenu={(e) => {
              this.contextMenuBuilder(e, 'editorUtils')
            }}>
              {editorUpUtilities}
            </div>
            <div
              onContextMenu={(e) => {
                this.contextMenuBuilder(e, 'editor')
              }}
            >
              <Paper
                style={{
                  height: height - 110,
                  width: editorWidth,
                  backgroundColor: '#141414'
                }}
                zDepth={3}>
                <div>
                  <AceEditor
                    mode='tex'
                    theme={aceEditorTheme}
                    snippets='tex'
                    name='mainEditor'
                    ref='mainEditor'
                    enableBasicAutocompletion
                    enableLiveAutocompletion
                    wrapEnabled
                    editorProps={{
                      $blockScrolling: Infinity
                    }}
                    width={(editorWidth + 5).toString() + 'px'}
                    height={(texEditorHeight - 110).toString() + 'px'}
                    fontSize={14}
                    value={this.state.texfilecontent}
                    setOptions={{
                      enableSnippets: true,
                      behavioursEnabled: true,
                      cursorStyle: 'smooth',
                      useWorker: false,
                      showPrintMargin: false
                    }}
                    onChange={this.updateTexInput.bind(this)}
                    onFocus={this.onFocusMainEditor.bind(this)}
                    onBlur={this.onBlurMainEditor.bind(this)}
                  />
                  <div style={{height: separateTexBibHeight, backgroundColor: '#fff'}}></div>
                  <AceEditor
                    mode='tex'
                    theme={aceEditorTheme}
                    snippets='tex'
                    name='bibEditor'
                    ref='bibEditor'
                    enableBasicAutocompletion
                    enableLiveAutocompletion
                    wrapEnabled
                    editorProps={{
                      $blockScrolling: Infinity
                    }}
                    width={(editorWidth + 5).toString() + 'px'}
                    height={(bibEditorHeight).toString() + 'px'}
                    fontSize={14}
                    value={this.state.bibfilecontent}
                    debounceChangePeriod={0.1}
                    setOptions={{
                      enableSnippets: true,
                      behavioursEnabled: true,
                      cursorStyle: 'smooth',
                      useWorker: false,
                      showPrintMargin: false
                    }}
                    onChange={this.updateBibInput.bind(this)}
                    onFocus={this.onFocusBibEditor.bind(this)}
                    onBlur={this.onBlurBibEditor.bind(this)}
                  />
                </div>
              </Paper>
            </div>
            <div onContextMenu={(e) => {
              this.contextMenuBuilder(e, 'editorCollabUtils')
            }}>
              {editorDownUtilities}
            </div>
          </div>
          <div key={'pdf'} style={divPDFStyle}>
            <Paper
              style={{
                height: height,
                width: this.PDFWidth,
                backgroundColor: previewPDFBackgroundColor,
                textAlign: 'center'
              }}
            >
              <div
                id='pdfContainer'
                style={{width: this.PDFWidth, height: PDFContainerHeight, overflow: 'hidden'}}
                onContextMenu={(e) => {
                  this.contextMenuBuilder(e, 'PDFPage')
                }}
              >
                {PreviewPDF}
              </div>
              {PDFUtils}
            </Paper>
          </div>
        </ReactGridLayout>
      </div>
    )
  }
}

class FakePage extends React.PureComponent {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div style={{display: 'none'}}>
        {
          Array.from(
            new Array(this.props.pages),
            (el, index) => (
              <Page
                key={`page_${index + 1}`}
                width={this.props.width}
                renderAnnotations
                className='pdfPage'
                renderMode='svg'
                pageNumber={index + 1}
              />
            )
          )
        }
      </div>
    )
  }
}

Grid.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}
