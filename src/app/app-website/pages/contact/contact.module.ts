import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { Route, RouterModule } from '@angular/router';
import { PropertyFindFormComponent } from '../../common-components/property-find-form/property-find-form.component';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { ContactFormComponent } from '../../common-components/contact-form/contact-form.component';


const routes: Route[] = [
  {
    path: '',
    component: ContactComponent
  }
]

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    PropertyFindFormComponent,
    SharedPipesModule,
    ContactFormComponent,
    RouterModule.forChild(routes)
  ]
})
export class ContactModule { }
