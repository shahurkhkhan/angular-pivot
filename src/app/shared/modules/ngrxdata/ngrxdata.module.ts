import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxdataComponent } from './ngrxdata.component';
import { NxErrorComponent } from './components/nx-error/nx-error.component';
import { NxLoaderComponent } from './components/nx-loader/nx-loader.component';
import { NxDataComponent } from './components/nx-data/nx-data.component';


@NgModule({
  declarations: [
    NgrxdataComponent,
    NxErrorComponent,
    NxLoaderComponent,
    NxDataComponent
  ],
  exports: [
    NgrxdataComponent,
    NxErrorComponent,
    NxLoaderComponent,
    NxDataComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NgrxdataModule { }
