import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Route, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

// Component
import { HomeComponent } from './home.component';
import { ClientTestimonialComponent } from '../../common-components/client-testimonial/client-testimonial.component';
import { MicroMarketTileComponent } from '../../common-components/micro-market-tile/micro-market-tile.component';

import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { LocationSearchComponent } from '../../common-components/location-search/location-search.component';
import { PropertyFindFormComponent } from '../../common-components/property-find-form/property-find-form.component';

import {MatSelectModule} from '@angular/material/select';
import { PropertySectionComponent } from '../../common-components/property-section/property-section.component';
import { HomeStore } from './shared/stores/home.store';
import { NgrxdataModule } from 'src/app/shared/modules/ngrxdata/ngrxdata.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



const routes: Route[] = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ClientTestimonialComponent,
    MicroMarketTileComponent,
    LocationSearchComponent,
    PropertyFindFormComponent,
    PropertySectionComponent,

    CarouselModule,
    MatSelectModule,
    NgxSkeletonLoaderModule,


    // Shared
    SharedPipesModule,
    NgrxdataModule,

    RouterModule.forChild(routes)
  ],
  providers: [
    HomeStore
  ]
})
export class HomeModule { }
