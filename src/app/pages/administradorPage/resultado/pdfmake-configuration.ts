// pdfmake-configuration.ts
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

export function setVfs() {
  const modifiedPdfMake = { ...pdfMake }; // Crear una copia de pdfMake
  modifiedPdfMake.vfs = pdfFonts.pdfMake.vfs;
  return modifiedPdfMake;
}

export function setFonts() {
  const modifiedPdfMake = { ...pdfMake }; // Crear una copia de pdfMake
  modifiedPdfMake.fonts = {
    Roboto: {
      normal: 'Roboto-Regular.ttf',
      bold: 'Roboto-Bold.ttf',
      italics: 'Roboto-Italic.ttf',
      bolditalics: 'Roboto-BoldItalic.ttf'
    }
  };
  return modifiedPdfMake;
}

export { pdfMake };
