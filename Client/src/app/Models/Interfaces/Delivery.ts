export interface Delivery {
  deliveryId: number;
  patientId: number;
  orderId: number;
  deliveryWorkerId: number;
  createdAt: Date;
  completedAt: Date;
  status: number;
}
