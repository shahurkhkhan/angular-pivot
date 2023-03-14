import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { Route, RouterModule } from '@angular/router';
import { PropertyFindFormComponent } from '../../common-components/property-find-form/property-find-form.component';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';


const routes: Route[] = [
  {
    path: '',
    component: ServicesComponent
  }
]

@NgModule({
  declarations: [
    ServicesComponent
  ],
  imports: [
    CommonModule,
    PropertyFindFormComponent,
    SharedPipesModule,
    RouterModule.forChild(routes)
  ]
})
export class ServicesModule { }
