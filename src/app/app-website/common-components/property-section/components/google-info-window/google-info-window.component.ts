import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PropertyTileComponent } from '../../../property-tile/property-tile.component';
import { RouterModule } from '@angular/router';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { bounceAnimation } from 'src/app/core/utils/animations';
@Component({
  selector: 'app-google-info-window',
  templateUrl: './google-info-window.component.html',
  styleUrls: ['./google-info-window.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PropertyTileComponent,
    RouterModule,
    SharedPipesModule
  ],
  animations: [bounceAnimation]
})
export class GoogleInfoWindowComponent implements OnInit {
  @Input()
  data: any;

  state = '';
  constructor() {
  }

  ngOnInit(): void {
    this.state = this.state ? '' : 'active';
  }
}
