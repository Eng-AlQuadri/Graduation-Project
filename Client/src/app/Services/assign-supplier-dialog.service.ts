import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Medicine } from "../Models/Interfaces/Medicine";

@Injectable({
  providedIn: 'root'
})

export class AssignSupplierDialogService {

  private selectedMedicine = new BehaviorSubject<null | Medicine>(null);
  private dialogVisible = new BehaviorSubject<boolean>(false);

  selectedMedicine$ = this.selectedMedicine.asObservable();
  dialogVisibility$ = this.dialogVisible.asObservable();

  constructor() {}

  showDialog(medicine: Medicine): void {
    this.selectedMedicine.next(medicine);
    this.dialogVisible.next(true);
  }

  hideDialog(): void {
    this.selectedMedicine.next(null);
    this.dialogVisible.next(false);
  }
}
