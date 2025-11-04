import { Purchase } from "./Purchase";

export interface SupplierDetail {
  id: number,
  userName: string,
  email: string,
  phoneNumber: string,
  purchases: Purchase []
}
