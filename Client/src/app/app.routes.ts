import { Routes } from '@angular/router';
import { adminGuard } from './Guards/admin.guard';
import { GuestLayoutComponent } from './Components/Guest/guest-layout/guest-layout.component';
import { AdminLayoutComponent } from './Components/Admin/admin-layout/admin-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoadPatientsComponent } from './Components/Admin/patients/load-patients/load-patients.component';
import { LoadPatientComponent } from './Components/Admin/patients/load-patient/load-patient.component';
import { PatientDetailResolver } from './Resolvers/patient-detail.resolver';
import { LoadSuppliersComponent } from './Components/Admin/suppliers/load-suppliers/load-suppliers.component';
import { LoadSupplierComponent } from './Components/Admin/suppliers/load-supplier/load-supplier.component';
import { SupplierDetailResolver } from './Resolvers/supplier-detail.resolver';
import { LoadMedicinesComponent } from './Components/Admin/medicines/load-medicines/load-medicines.component';
import { LoadPurchasesComponent } from './Components/Admin/purchases/load-purchases/load-purchases.component';
import { SupplierLayoutComponent } from './Components/Supplier/supplier-layout/supplier-layout.component';
import { supplierGuard } from './Guards/supplier.guard';
import { LoadOrdersComponent } from './Components/Admin/orders/load-orders-component/load-orders.component';
import { PatientLayoutComponent } from './Components/Patient/patient-layout/patient-layout.component';
import { patientGuard } from './Guards/patient.guard';
import { OrdersComponent } from './Components/Patient/orders/orders.component';
import { GetMyOrdersComponent } from './Components/Patient/orders/get-my-orders/get-my-orders.component';
import { DoctorsComponent } from './Components/Admin/doctors/doctors.component';
import { DeliveryWorkersComponent } from './Components/Admin/delivery-workers/delivery-workers.component';
import { DeliveriesComponent as AdminDeliveries } from './Components/Admin/deliveries/deliveries.component';
import { DeliveriesComponent as PatientDeliveries} from './Components/Patient/deliveries/deliveries.component';
import { deliveryGuard } from './Guards/delivery.guard';
import { DeliveryLayoutComponent } from './Components/Delivery/delivery-layout/delivery-layout.component';
import { LoadDeliveriesComponent } from './Components/Delivery/load-deliveries/load-deliveries.component';

export const routes: Routes =
[
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "admin",
    runGuardsAndResolvers: 'always',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children:
    [
      {
        path: '',
        redirectTo: 'patients',
        pathMatch: 'full'
      },
      {
        path: 'patients',
        component: LoadPatientsComponent
      },
      {
        path: 'doctors',
        component: DoctorsComponent
      },
      {
        path: 'delivery-worker',
        component: DeliveryWorkersComponent
      },
      {
        path: 'deliveries',
        component: AdminDeliveries
      },
      {
        path: 'patients/:id',
        component: LoadPatientComponent,
        resolve: {patient: PatientDetailResolver}
      },
      {
        path: 'suppliers',
        component: LoadSuppliersComponent
      },
      {
        path: 'suppliers/:id',
        component: LoadSupplierComponent,
        resolve: {supplier: SupplierDetailResolver}
      },
      {
        path: 'medicines',
        component: LoadMedicinesComponent
      },
      {
        path: 'purchases',
        component: LoadPurchasesComponent
      },
      {
        path: 'orders',
        component: LoadOrdersComponent
      }
    ]

  },
  {
    path: 'supplier',
    component: SupplierLayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [supplierGuard]
  },
  {
    path: 'patient',
    component: PatientLayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [patientGuard],
    children:
    [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'get-my-orders',
        component: GetMyOrdersComponent
      },
      {
        path: 'deliveries',
        component: PatientDeliveries
      }
    ]
  },
  {
    path: 'delivery',
    runGuardsAndResolvers: 'always',
    canActivate: [deliveryGuard],
    component: DeliveryLayoutComponent,
    children:
    [
      {
        path: '',
        redirectTo: 'items',
        pathMatch: 'full'
      },
      {
        path: 'items',
        component: LoadDeliveriesComponent
      }
    ]
  },
  {
    path: 'login',
    component: GuestLayoutComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];
