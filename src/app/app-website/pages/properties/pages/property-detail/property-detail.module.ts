
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
import { PropertyDetailStore } from '../shared/services/property-detail.store';
import { NgrxdataModule } from 'src/app/shared/modules/ngrxdata/ngrxdata.module';
import { MapMarkerComponent } from 'src/app/app-website/common-components/property-section/components/map-marker/map-marker.component';
import { GoogleInfoWindowComponent } from 'src/app/app-website/common-components/property-section/components/google-info-window/google-info-window.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


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
    NgrxdataModule,
    MapMarkerComponent,
    GoogleInfoWindowComponent,
    NgxSkeletonLoaderModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PropertyDetailStore
  ]
})
export class PropertyDetailModule { }
