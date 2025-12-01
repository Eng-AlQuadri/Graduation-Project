export interface CreateOrder {
  orderDate: Date;
  patientId: number;
  homeLocation: string;
  patientPhoneNumber: string;
  prescriptionUrl: string;
  orderDetails: CreateOrderDetails[];
}

export interface CreateOrderDetails {
  medicineId: number;
  medicineQuantity: number;
}
