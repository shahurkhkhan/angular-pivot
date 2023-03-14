import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Main Website Routes
  {
    path: '',
    loadChildren: () => import('./app-website/app-website.module').then(m => m.AppWebsiteModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
