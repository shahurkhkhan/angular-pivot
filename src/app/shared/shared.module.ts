import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipesModule } from './pipes/shared-pipes.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedPipesModule
  ],
  exports: [
    SharedPipesModule
  ]
})
export class AppModule { }
