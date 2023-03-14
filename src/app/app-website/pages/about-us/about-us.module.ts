import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { Route, RouterModule } from '@angular/router';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';

const routes: Route[] = [
  {
    path: '',
    component: AboutUsComponent
  }
]

@NgModule({
  declarations: [
    AboutUsComponent,

  ],
  imports: [
    CommonModule,
    SharedPipesModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutUsModule { }
