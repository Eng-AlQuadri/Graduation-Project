export interface Medicine {
  id: number;
  name: string;
  packing: string;
  supplierName: string;
  stock: number;
  expiryDate: Date;
  price: number;
  supplierId: number;
}
