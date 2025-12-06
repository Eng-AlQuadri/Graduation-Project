import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Doctor } from '../Models/Interfaces/Doctor';
import { DeliveryWorker } from '../Models/Interfaces/DeliveryWorkers';

@Injectable({
  providedIn: 'root'
})
export class UpdateDeliveryWorkerDialogService {

  private dialogVisible = new BehaviorSubject<boolean>(false);
  private selectedDeliveryWorker = new BehaviorSubject<DeliveryWorker | null>(null);

  public dialogVisible$ = this.dialogVisible.asObservable();
  public selectedDeliveryWorker$ = this.selectedDeliveryWorker.asObservable();

  constructor() { }

  showDialog(deliveryWorker: DeliveryWorker): void {
    this.selectedDeliveryWorker.next(deliveryWorker);
    this.dialogVisible.next(true);
  }

  hideDialog(): void {
    this.selectedDeliveryWorker.next(null);
    this.dialogVisible.next(false);
  }
}
