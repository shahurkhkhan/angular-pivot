import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppWebsiteRoutingModule } from './app-website-routing.module';
import { LayoutModule } from './layout/layout.module';
import { GoogleInfoWindowComponent } from './common-components/property-section/components/google-info-window/google-info-window.component';


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
