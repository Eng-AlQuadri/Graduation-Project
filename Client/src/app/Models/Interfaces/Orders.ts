export interface Orders {
  id: number;
  orderDate: Date;
  patientId: number;
  patientName: string;
  homeLocation: string;
  patientPhoneNumber: string;
  approved?: boolean;
  approvedTime?: Date;
  prescriptionUrl: string;
  orderDetails: OrderDetails[];
}

export interface OrderDetails {
  orderId: number;
  medicineId: number;
  medicineName: string;
  medicineQuantity: number;
  unitPrice: number;
  totalPrice: number;
}
