import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesComponent } from './properties.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: ':propertyID',
    loadChildren: () => import('./pages/property-detail/property-detail.module').then(m => m.PropertyDetailModule),
  },
]

@NgModule({
  declarations: [
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PropertiesModule { }
