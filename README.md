# Infinitex
![alt start screenshot](https://raw.githubusercontent.com/fetacore/Infinitex/master/infinitex.gif)

This is my first attempt to write a desktop app with electron and learn the fantastic reactjs library. The editor is far from complete but I use it personally and I wanted to open-source it so that others can help with it.

The one part of the app is a LaTeX editor with search functionality and simplified bibliography and packages handling. The other part is a WYSIWYG editor based on quilljs. The simple part also supports encrypted documents.

I have built it on Debian Linux and I tried on Windows but, like always, everything in there is crappy compared to Linux ~~so I just dropped it~~. I still have not tested on mac but I plan on doing it soon. Otherwise I expect that the program will be fully functional for anyone who wants to develop it on their mac.

[URL](https://github.com/fetacore/Infinitex/releases) for prebuild binaries with autoupdates.

In order to run LaTeX you need to have an installed version of the interpeter like TeXlive, MacTex or MikTex.

To start the process go to the folder, open a terminal there and press
```
yarn && yarn preminify
npm start
```
The file Infinitex.jsx is only used for react-dom. The app.jsx file separates the two environments and has width and height event listeners.
The grid.jsx file has the LaTeX editor and the editor.jsx file has the WYSIWYG.


To build the minified js you press
```
npm run minify
```

To create the executable in a dist folder run (!Attention! This will trigger the minification which takes a lot of time)
```
npm run dist
```

## Issues:
1. Compilation and configurations for Mac (probably works, will test soon) ~~and Windows~~.
2. ~~Configure auto-updates (work on linux and windows)~~.
3. ~~Detect latex change and move pdf to that page.~~
4. ~~Better memory handling of Ace editor~~.
5. ~~Open files with the app without the app being open~~
6. ~~Configure KaTeX to take both $math$ and $$math$$ and interpret them accordingly.~~
7. Open formula module on math selection at simple.

## Roadmap:
1. Either move to Semantic UI or Material UI beta for performance.
2. Integration with ~~cloud services~~IPFS for collaboration (working on it).
