import { Component } from "@angular/core";

interface IGoogleMapConfig {
  center: google.maps.LatLngLiteral,
  zoom: number
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  // Map Config
  public googleMapConfig: IGoogleMapConfig = {} as IGoogleMapConfig;

  constructor() {
    this.googleMapConfig.center = {} as any;
    this.googleMapConfig.center.lat = 25.789801;
    this.googleMapConfig.center.lng = 73.327797;
    this.googleMapConfig.zoom = 14;
  }
}
