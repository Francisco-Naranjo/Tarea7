import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFactura } from '../Interfaces/ifactura';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SFacturas {
  
  private readonly rutaAPI = 'https://localhost:7056/api/Factura';
  constructor(private http: HttpClient) {}
  
   manejoErrores(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error de red';
    return throwError(() => {
      new Error(msg);
    });
  }
  

  todos(): Observable<IFactura[]> {
    var clientes = this.http
      .get<IFactura[]>(this.rutaAPI)
      .pipe(catchError(this.manejoErrores));
    return clientes;
  }
  unaFactura(id: number): Observable<IFactura> {
    return this.http
      .get<IFactura>(`${this.rutaAPI}/${id}`)
      .pipe(catchError(this.manejoErrores));
  }

  
 /*
  guardarCliente(cliente: ICliente): Observable<ICliente> {
    return this.http
      .post<ICliente>(this.rutaAPI, cliente)
      .pipe(catchError(this.manejoErrores));
  }
  actualizarCliente(cliente: ICliente): Observable<ICliente> {
    return this.http
      .put<ICliente>(`${this.rutaAPI}/${cliente.id}`, cliente)
      .pipe(catchError(this.manejoErrores));
  }

  eliminarcliente(id:number): Observable<number>{
    return this.http
      .delete<number>(`${this.rutaAPI}/${id}`)
      .pipe(catchError(this.manejoErrores));
  }*/

}

