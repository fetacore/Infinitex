import Document from 'react-pdf/build/Document';
import Page from 'react-pdf/build/Page';

const pdfjs = require('pdfjs-dist/build/pdf.js');

pdfjs.PDFJS.workerSrc = '../src/react/reactPdf/pdf.worker.min.js';
pdfjs.PDFJS.cMapUrl = '../src/react/reactPdf/cmaps/';
pdfjs.PDFJS.cMapPacked = true;

export {
  Document,
  Page,
};
