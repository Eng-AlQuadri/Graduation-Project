export interface Orders {
  id: number;
  orderDate: Date;
  patientId: number;
  patientName: string;
  address: string;
  phoneNumber: string;
  approved?: boolean;
  approvalTime?: Date;
  prescriptionUrl: string;
  totalPrice: number;
  orderDetails: OrderDetails[];
}

export interface OrderDetails {
  orderId: number;
  medicineId: number;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
