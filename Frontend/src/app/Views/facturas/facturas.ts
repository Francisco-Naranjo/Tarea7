import { Component } from '@angular/core';
import { IFactura } from '../../Interfaces/ifactura';
import { SFacturas } from '../../Services/sfacturas';

@Component({
  selector: 'app-facturas',
  imports: [],
  templateUrl: './facturas.html',
  styleUrl: './facturas.css'
})
export class Facturas {

  lista_facturas$!: IFactura[];

  constructor(private SFacturas: SFacturas) {}

  ngOnInit() {
    this.cargaTabla();
  }

  cargaTabla() {
    this.SFacturas.todos().subscribe((facturas) => {
      this.lista_facturas$ = facturas;
      console.log(this.lista_facturas$)
    });
  }

  imprimir() {
    const html = document.getElementById('tabla-facturas')?.outerHTML;
    if (!html) return;

    const ventana = window.open('', '', 'height=600,width=900');
    if (!ventana) return;

    ventana.document.open();
    ventana.document.write(`
      <!doctype html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Reporte de Facturación</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f4f4f4;
          }
          @page {
            size: A4 portrait;
            margin: 12mm;
          }
          @media print {
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <h2>REPORTE DE FACTURACION</h2>
        ${html}
        <br/>
        <button onclick="window.print()">Imprimir</button>
      </body>
      </html>
    `);

    ventana.document.close();
  }
}



