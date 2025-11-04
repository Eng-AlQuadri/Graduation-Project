import { InvoiceDetail } from "./InvoiceDetail";

export interface Invoice {
  id: number,
  invoiceDate: Date,
  totalPrice: number,
  patientName: string;
  invoiceDetails: InvoiceDetail []
}
