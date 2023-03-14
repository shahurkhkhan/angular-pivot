import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const websiteRoutes: Routes = [
  {
    path: '',
    title: 'Home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about-us',
    title: 'About',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'contact-us',
    title: 'Contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'our-services',
    title: 'Our Services',
    loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'properties',
    title: 'Properties',
    loadChildren: () => import('./pages/properties/properties.module').then(m => m.PropertiesModule)
  },
  {
    path: 'market-overview',
    title: 'Market',
    loadChildren: () => import('./pages/market-overview/market-overview.module').then(m => m.MarketOverviewModule)
  }
];


const routes: Routes = [
  {
    path: '',
    title: 'Pivot',
    component: LayoutComponent,
    children: websiteRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppWebsiteRoutingModule { }
