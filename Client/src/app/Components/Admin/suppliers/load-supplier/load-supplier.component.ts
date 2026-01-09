import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Purchase } from '../../../../Models/Interfaces/Purchase';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-load-supplier',
  imports:
  [
    FormsModule,
    CommonModule,
    DatePipe
  ],
  templateUrl: './load-supplier.component.html',
  styleUrl: './load-supplier.component.css'
})
export class LoadSupplierComponent implements OnInit {

  purchases: Purchase[] = [];

  supplierId!: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.purchases = data['supplier'].data.items;
    })

    this.route.params.subscribe(data => {
      this.supplierId = data['id'];
    })
  }

  backPage(){

    this.router.navigate(['admin/suppliers'], {state: { fromPurchases: true }})
  }
}
