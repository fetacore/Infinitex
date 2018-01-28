# Infinitex
This is my first attempt to write a desktop app with electron and learn the fantastic reactjs library. The editor is far from complete but I use it personally and I wanted to open-source it so that others can help with it.

The one part of the app is a LaTeX editor with search functionality and simplified bibliography and packages handling. The other part is a WYSIWYG editor based on quilljs. The simple part also supports encrypted documents.

I have built it on Debian Linux and I tried on Windows but, like always, everything in there is crappy compared to Linux so I just dropped it.

To start it press
```
yarn
npm start
```
If you want live reload you need to point the index.html file to the entryDev.js file (commented just above the inf.min.js script).
The file Infinitex.jsx is only used for react-dom. The app.jsx file separates the two environments and has width and height event listeners.
The grid.jsx file has the LaTeX editor and the editor.jsx file has the WYSIWYG.


To update the minified js you press
```
npm run build
```

To create the executable in the (created) dist folder run
```
npm run make
```

## Issues:
1. Detect latex change and move pdf to that page.
2. Better memory handling of Ace editor.
3. Open files with the app without the app being open.

## Roadmap:
1. Compilation and configurations for Mac and Windows.
2. Integration with cloud service for collaboration.
