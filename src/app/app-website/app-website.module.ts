import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppWebsiteRoutingModule } from './app-website-routing.module';
import { LayoutModule } from './layout/layout.module';


@NgModule({
  declarations: [
  ],
  imports: [
    LayoutModule,
    CommonModule,
    AppWebsiteRoutingModule
  ]
})
export class AppWebsiteModule { }
