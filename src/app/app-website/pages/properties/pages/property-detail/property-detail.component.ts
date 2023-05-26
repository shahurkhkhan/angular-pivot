import { AfterViewInit, Component, HostBinding, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PropertyDetailStore } from '../shared/services/property-detail.store';
import { ActivatedRoute } from '@angular/router';
import { delay, filter } from 'rxjs';
import { IProperty } from 'src/app/core/interfaces/property.interface';
import { GoogleMap } from '@angular/google-maps';
import { createHTMLMapMarker } from 'src/app/core/utils/marker';
import { NgElement, WithProperties, createCustomElement } from '@angular/elements';
import { GoogleInfoWindowComponent } from 'src/app/app-website/common-components/property-section/components/google-info-window/google-info-window.component';
import { SubSink } from 'subsink';
import { MapMarkerComponent } from 'src/app/app-website/common-components/property-section/components/map-marker/map-marker.component';
import { listAnimation } from 'src/app/core/utils/animations';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
  animations: [listAnimation]
})
export class PropertyDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class')
  public hostBinding = 'app-property-detail d-block position-relative';
  public albums: any[] = [];
  public searchBarState = {} as any;
  public pageState = {} as any;
  // Instance
  private subsink = new SubSink();

  // Map Config
  @ViewChild(GoogleMap, { static: false })
  public gmap!: GoogleMap;
  public infoWindow!: google.maps.InfoWindow;
  public googleMapConfig!: google.maps.MapOptions;
  public marker: any;
  // Data
  public property: IProperty = {} as IProperty;
  // Slider
  public sliderConfigration: OwlOptions = {
    items: 4,
    dots: false,
    margin: 3,
    nav: true,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
    responsive : {
        0 : {
          items: 2,
        },
        575 : {
          items: 3,
          nav: false
        },
        991 : {
          items: 4
        }
    }
  }
  // Selector
  public propertySelector = this._propertyDetailStore.getPropertySelector;
  public propertiesSelector = this._propertyDetailStore.getPropertiesSelector;
  public microMarketSelector = this._propertyDetailStore.getMicroMarketsSelector;

  constructor(
    private injector: Injector,
    private _lightbox: Lightbox,
    private _propertyDetailStore: PropertyDetailStore,
    private _activatedRoute: ActivatedRoute
  ) {
    this.searchBarState.isShow = false;
    this.googleMapConfig = {
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      fullscreenControl: true,
      clickableIcons: false,
      zoom: 4
    };
    // Images
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
    // Route
    this.pageState.propertyID = this._activatedRoute.snapshot.params['propertyID'];
    // Get Detail
    this._propertyDetailStore.getProperty(this.pageState.propertyID);
    this._propertyDetailStore.getProperties({});
    this._propertyDetailStore.getMicroMarkets({});
  }

  ngOnInit(): void {
    this.customElements();
    this.subsink.sink = this.propertySelector.data$
    .pipe(filter(d => !!d))
    .subscribe(property => this.property = property)
  }

  ngOnDestroy(): void {
    this.gmap.googleMap?.unbindAll();
    this.subsink.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.subsink.sink = this.propertySelector.data$
    .pipe(filter(d => !!d), delay(1000))
    .subscribe(property => {
      this.marker?.setMap(null);
      this.setPropertyMarker(property)
    })
  }
  /**
   * Custom element form Map Marker
   */
  private customElements() {
    if (customElements.get('app-map-marker') === undefined) {
      const appCustomIcon = createCustomElement(MapMarkerComponent, {
        injector: this.injector
      });
      customElements?.define('app-map-marker', appCustomIcon); // Custom element close
    }
    if (customElements.get('app-google-info-window') === undefined) {
      const appCustomIcon = createCustomElement(GoogleInfoWindowComponent, {
        injector: this.injector
      });
      customElements?.define('app-google-info-window', appCustomIcon); // Custom element close
    }
  }


  // Image popup
  public open(index: number): void {
    this._lightbox.open(this.albums, index);
  }
  public close(): void {
    this._lightbox.close();
  }

  // marker
  private setPropertyMarker(
    property: IProperty
  ) {
    if (!property) return;
      const lat = Number(property.lat);
      const lan = Number(property.lan);
      this.marker = createHTMLMapMarker(
        {
          latlng: new google.maps.LatLng(lat, lan),
          map: this.gmap.googleMap,
          x: lat,
          y: lan,
          markerData: property,
        }
      );
      this.marker.setMap(this.gmap.googleMap as any);
      this.gmap.googleMap?.setCenter(new google.maps.LatLng(lat, lan))
      this.gmap.googleMap?.setZoom(4)
      this.marker.addListener("click", () => {
        this.infoWindow?.close();
        this.infoWindowCmp(property).open(this.gmap.googleMap, this.marker)
      });
  }
  public infoWindowCmp(data: any) {
    const infoWindowComponent = document.createElement('app-google-info-window') as NgElement & WithProperties<{data: string}>;
    infoWindowComponent.data = data;
    this.infoWindow = new google.maps.InfoWindow({
      content: infoWindowComponent
    });
    return this.infoWindow;
  }

  // __Getter
  public get propertyDetail () {
    return {
      all: this.property?.details?.map(detail => {
        return {
          value: detail?.value,
          name: detail?.fields?.name
        }
      }),
      top: this.property?.details?.sort((a, b) => {
        return Number(a.field) < Number(b.field) ? -1 : 1;
      }).map(detail => {
        return {
          field: detail.field,
          value: detail?.value,
          name: detail?.fields?.name
        }
      }).slice(0, 5)
    }
  }

  // Helper
public propertyDetailTrackByFuc(index:number, el:any): number {
  return el.field;
}
}
