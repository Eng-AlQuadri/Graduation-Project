import { Invoice } from "./Invoice";

export interface PatientDetail {
  id: number,
  userName: string,
  email: string,
  phoneNumber: string,
  invoices: Invoice []
}
