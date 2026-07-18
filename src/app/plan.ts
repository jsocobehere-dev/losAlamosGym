export interface Plan {
  id: number;
  nombre: string;
  descripcion: string;
  profesor: string;
  precio: number;
  img: string;
  enOferta: boolean;
  cantidad:number;
  stock:number;
}