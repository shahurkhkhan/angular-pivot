import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-tile',
  standalone: true,
  imports: [
    CommonModule,
    SharedPipesModule,
    RouterModule
  ],
  templateUrl: './property-tile.component.html',
  styleUrls: ['./property-tile.component.scss']
})
export class PropertyTileComponent {
  @HostBinding('class')
  public hostClass = 'app-property-tile d-block';
  @Input()
  public type: 'list' | 'grid' = 'grid';
}
