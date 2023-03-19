
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PropertyDetailComponent } from './property-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { MicroMarketTileComponent } from 'src/app/app-website/common-components/micro-market-tile/micro-market-tile.component';
import { PropertyTileComponent } from 'src/app/app-website/common-components/property-tile/property-tile.component';
import { LightboxModule } from 'ngx-lightbox';
import { PropertySectionComponent } from 'src/app/app-website/common-components/property-section/property-section.component';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';


const routes: Routes = [
  {
    path: '',
    component: PropertyDetailComponent
  }
]

@NgModule({
  declarations: [
    PropertyDetailComponent
  ],
  imports: [
    CommonModule,
    SharedPipesModule,
    MicroMarketTileComponent,
    PropertyTileComponent,
    PropertySectionComponent,
    LightboxModule,
    CarouselModule,
    GoogleMapsModule,
    RouterModule.forChild(routes)
  ]
})
export class PropertyDetailModule { }
