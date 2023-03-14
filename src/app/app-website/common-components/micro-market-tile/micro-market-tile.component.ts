import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-micro-market-tile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './micro-market-tile.component.html',
  styleUrls: ['./micro-market-tile.component.scss']
})
export class MicroMarketTileComponent {
  @HostBinding('class')
  public hostClass = 'app-micro-market-tile d-block';
  @Input()
  public image!: string;
  @Input()
  public title!: string;
  @Input()
  public contnet!: string;
  @Input()
  public type: 'list' | 'grid' = 'grid';
}
