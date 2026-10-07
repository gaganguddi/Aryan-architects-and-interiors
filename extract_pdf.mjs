import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
const pdfParse = pdf.default || pdf;

const pdf1 = fs.readFileSync('ARYAN PORTFOLIO FINAL.pdf');
const pdf2 = fs.readFileSync('Completed projects.pdf');

async function extract() {
  try {
    const data1 = await pdfParse(pdf1);
    const data2 = await pdfParse(pdf2);
    
    fs.writeFileSync('pdf_extract.txt', '===ARYAN PORTFOLIO===\n' + data1.text + '\n\n===COMPLETED PROJECTS===\n\n' + data2.text);
    console.log('Extraction complete. Saved to pdf_extract.txt');
  } catch(e) {
    console.error(e);
  }
}

extract();
