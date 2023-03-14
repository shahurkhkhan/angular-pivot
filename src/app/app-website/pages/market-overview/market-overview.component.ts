import { Component, HostBinding } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html',
  styleUrls: ['./market-overview.component.scss']
})
export class MarketOverviewComponent {
  @HostBinding('app-market-overview')
  public hostClass = 'app-market-overview d-block';

  public albums: any[] = [];

  public sliderConfigration: OwlOptions = {
    items: 3,
    dots: false,
    margin: 3,
    nav: true,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']
  }

  constructor(
    private _lightbox: Lightbox
  ) {
    for (let i = 1; i <= 3; i++) {
      const src = 'assets/images/factory.jpg';
      const caption = 'factory';
      const thumb = 'assets/images/factory.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb,
      };
      this.albums.push(album);
    }
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
