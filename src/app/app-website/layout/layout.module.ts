import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
// mat Imports
import { MatIconModule } from '@angular/material/icon';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    // Mat
    MatIconModule,
    // Custom
    SharedPipesModule,

    RouterModule
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
