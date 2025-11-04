import { Injectable } from '@angular/core';
import { Supplier } from '../Models/Interfaces/Supplier';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateSupplierDialogService {

  private dialogVisible = new BehaviorSubject<boolean>(false);
  private selectedSupplier = new BehaviorSubject<Supplier | null>(null);

  public dialogVisible$ = this.dialogVisible.asObservable();
  public selectedSupplier$ = this.selectedSupplier.asObservable();

  constructor() { }

  showDialog(supplier: Supplier): void {
    this.selectedSupplier.next(supplier);
    this.dialogVisible.next(true);
  }

  hideDialog(): void {
    this.selectedSupplier.next(null);
    this.dialogVisible.next(false);
  }
}
