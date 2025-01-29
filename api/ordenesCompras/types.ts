export interface IOrdenProducto {
    producto_id: string;
    cantidad: number;
  }


export interface Iorden {
        id?: string;
        usuario_id: string;
        productos: IOrdenProducto[];
        precio_total: number;
        creado_el?: Date;
        actualizado_el?: Date;
      }
