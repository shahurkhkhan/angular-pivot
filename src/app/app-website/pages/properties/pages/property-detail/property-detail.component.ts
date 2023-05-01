import { Component, HostBinding } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PropertyDetailStore } from '../shared/services/property-detail.store';
interface IGoogleMapConfig {
  center: google.maps.LatLngLiteral,
  zoom: number
}
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
})
export class PropertyDetailComponent {
  @HostBinding('class')
  public hostBinding = 'app-property-detail d-block position-relative';
  public albums: any[] = [];
  public searchBarState = {} as any;

  // Map Config
  public googleMapConfig: IGoogleMapConfig = {} as IGoogleMapConfig;

  public sliderConfigration: OwlOptions = {
    items: 4,
    dots: false,
    margin: 3,
    nav: true,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']
  }

  constructor(
    private _lightbox: Lightbox,
    private _propertyDetailStore: PropertyDetailStore
  ) {
    this.googleMapConfig.center = {} as any;
    this.googleMapConfig.center.lat = 25.789801;
    this.googleMapConfig.center.lng = 73.327797;
    this.googleMapConfig.zoom = 14;

    this.searchBarState.isShow = false;
    for (let i = 1; i <= 4; i++) {
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

    // Get Detail
    this._propertyDetailStore.getProperty(2)
  }

  open(index: number): void {
    this._lightbox.open(this.albums, index);
  }

  close(): void {
    this._lightbox.close();
  }
}
