import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  constructor() {}

  generatePDF(div: HTMLElement): Observable<{}> {
    return from(html2canvas(div, { backgroundColor: '#f2f2f4' })).pipe(
      map((canvas: HTMLCanvasElement) => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('dashboard.pdf'); // Generated PDF
        return pdf;
      })
    );
  }
}
