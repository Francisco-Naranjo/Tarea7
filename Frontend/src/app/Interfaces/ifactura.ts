

export interface IFactura {
  id: number;
  clientesModel: any; // Puedes reemplazar 'any' por una interfaz de cliente si la tienes
  clientesModelId: number;
  codigo_Venta: string;
  descuento: number;
  detalleFactura: IDetalleFactura[];
  estado_Venta: string;
  fechaVenta: string;
  metodo_Pago: string;
  notas: string;
  sub_Total_Venta: number;
  total_Venta: number;
}

export interface IDetalleFactura {
  producto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

