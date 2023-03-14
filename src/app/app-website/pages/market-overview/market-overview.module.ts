import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketOverviewComponent } from './market-overview.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { LightboxModule } from 'ngx-lightbox';
import { MicroMarketFilterFormComponent } from '../../common-components/micro-market-filter-form/micro-market-filter-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: ':marketID',
    component: MarketOverviewComponent
  }
]

@NgModule({
  declarations: [
    MarketOverviewComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    SharedPipesModule,
    LightboxModule,
    MicroMarketFilterFormComponent,
    RouterModule.forChild(routes)
  ]
})
export class MarketOverviewModule { }
