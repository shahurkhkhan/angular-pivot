import {
  Component,
  HostBinding,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
  Injector,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyFilterTileComponent } from './components/property-filter-tile/property-filter-tile.component';
import { PropertyTileComponent } from 'src/app/app-website/common-components/property-tile/property-tile.component';
import { MatSelectModule } from '@angular/material/select';
import {
  GoogleMap,
  GoogleMapsModule,
  MapInfoWindow,
} from '@angular/google-maps';
import { MapMarkerComponent } from './components/map-marker/map-marker.component';
import { createHTMLMapMarker } from '../../../core/utils/marker';
import {
  NgElement,
  WithProperties,
  createCustomElement,
} from '@angular/elements';
import { PropertyStore } from './shared/services/property.store';
import * as utils from 'src/app/core/utils/common.utils';
import { NgrxdataModule } from 'src/app/shared/modules/ngrxdata/ngrxdata.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { SubSink } from 'subsink';
import { IProperty } from 'src/app/core/interfaces/property.interface';
import { IPropertyGetpayload } from './shared/interfaces/property.interface';
import { GoogleInfoWindowComponent } from './components/google-info-window/google-info-window.component';
import { DeviceDetectService } from 'src/app/core/services/device-detect.service';
@Component({
  selector: 'app-property-section',
  standalone: true,
  imports: [
    CommonModule,
    PropertyFilterTileComponent,
    PropertyTileComponent,
    GoogleInfoWindowComponent,
    MatSelectModule,
    GoogleMapsModule,
    MapMarkerComponent,
    NgrxdataModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './property-section.component.html',
  styleUrls: ['./property-section.component.scss'],
})
export class PropertySectionComponent
  implements AfterViewInit, OnInit, AfterViewChecked, OnDestroy
{
  @HostBinding('class')
  public hostClass = 'app-property-section d-block position-relative';
  // Filter State
  public utils = utils;
  public sectionSplitState: any;
  public filterTileHeight = 700;
  public subSink = new SubSink();
  // Ref
  @ViewChild('filterTile', { read: ElementRef<HTMLElement> })
  public filterTile!: ElementRef<HTMLElement>;
  @ViewChild(GoogleMap, { static: false })
  public gmap!: GoogleMap;
  public infoWindow!: google.maps.InfoWindow;
  public googleMapConfig!: google.maps.MapOptions;

  // APi
  public propertiesDataSelectors = this._propertyStore.useSelector<IProperty[]>(
    {
      statusKey: 'list',
      moduleKey: 'properties',
      datakey: 'list',
    }
  );
  public properties: any[] = [];
  public propertyFilterPayload = {} as any;
  // Map
  private markerClusterer!: MarkerClusterer;

  constructor(
    private injector: Injector,
    private _propertyStore: PropertyStore,
    private _deviceDetectService: DeviceDetectService
  ) {
    this.sectionSplitState = { filter: true, map: true, listing: true } as any;
    if (['md','lg'].includes(this._deviceDetectService.getMediaQueryName())) {
      this.sectionSplitState.filter = false;
    } else if ( ['sm','xs'].includes(this._deviceDetectService.getMediaQueryName())) {
      this.sectionSplitState.filter = false;
      this.sectionSplitState.listing = false;
    }
  }

  ngOnInit(): void {
    this.customElements();
    this._propertyStore
      .moduleState('properties')
      .subscribe(
        (d: any) => (this.propertyFilterPayload = d?.otherData?.queryPayload)
      );
    this.getProperties(this.propertyFilterPayload);
  }

  ngAfterViewInit(): void {
    this.filterTileHeight =
      this.filterTile?.nativeElement?.offsetHeight &&
      this.filterTile?.nativeElement?.offsetHeight > 0
        ? this.filterTile?.nativeElement?.offsetHeight
        : this.filterTileHeight;
    // Set Map Configration
    this.googleMapConfig = {
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP,
      },
      fullscreenControl: true,
      clickableIcons: false,
    };
    // // Cluster
    this.overlappingMarkerClusterer();
    // // Set markers
    this.subSink.sink = this.propertiesDataSelectors.data$.subscribe(
      (properties) => {
        this.properties = properties;
        this.setPropertiesMarker(properties);
      }
    );
  }

  ngAfterViewChecked(): void {
    if (
      this.filterTileHeight !== this.filterTile?.nativeElement?.offsetHeight
    ) {
      this.filterTileHeight =
        this.filterTile?.nativeElement?.offsetHeight &&
        this.filterTile?.nativeElement?.offsetHeight > 0
          ? this.filterTile?.nativeElement?.offsetHeight
          : this.filterTileHeight;
    }
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  public sectionSplit(
    clickBTNAction: 'filter' | 'map' | 'listing' | 'mapListing' | 'all',
  ) {
    if (['md','sm','xs'].includes(this._deviceDetectService.getMediaQueryName())) {
      if (clickBTNAction === 'mapListing') {
        this.sectionSplitState.map = true;
        this.sectionSplitState.listing = false;
      }
      if (clickBTNAction === 'filter') {
        this.sectionSplitState.filter = !this.sectionSplitState.filter;
        this.sectionSplitState.map = true;
        this.sectionSplitState.listing = false;
      }
      if (clickBTNAction === 'map') {
        this.sectionSplitState.filter = false;
        this.sectionSplitState.map = false;
        this.sectionSplitState.listing = true;
      }
    } else {
      if (clickBTNAction === 'filter') {
        this.sectionSplitState.filter = !this.sectionSplitState.filter;
      }
      if (clickBTNAction === 'map') {
        this.sectionSplitState.map = false;
        this.sectionSplitState.listing = true;
      }
      if (clickBTNAction === 'listing') {
        this.sectionSplitState.listing = false;
      }
      if (clickBTNAction === 'mapListing') {
        this.sectionSplitState.map = true;
        this.sectionSplitState.listing = true;
      }
    }
  }

  /**
   * Custom element form Map Marker
   */
  private customElements() {
    if (customElements.get('app-map-marker') === undefined) {
      const appCustomIcon = createCustomElement(MapMarkerComponent, {
        injector: this.injector,
      });
      customElements?.define('app-map-marker', appCustomIcon); // Custom element close
    }
    if (customElements.get('app-google-info-window') === undefined) {
      const appCustomIcon = createCustomElement(GoogleInfoWindowComponent, {
        injector: this.injector,
      });
      customElements?.define('app-google-info-window', appCustomIcon); // Custom element close
    }
  }

  /**
   * Scheduke and technicains clusterer overlay
   */
  private overlappingMarkerClusterer() {
    this.markerClusterer = new MarkerClusterer(this.gmap.googleMap as any, [], {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      maxZoom: 4,
    });
  }

  /**
   * Get Property
   * @param filterPayload
   */
  public filterProperties(filterPayload: any) {
    this.getProperties(filterPayload);
  }

  private getProperties(payload?: IPropertyGetpayload) {
    this._propertyStore.getPropertiees({
      ...payload,
    });
  }

  /***
   * Set Marker on map
   */
  private setPropertiesMarker(properties: IProperty[]) {
    if (!properties) return;
    this.markerClusterer.clearMarkers();
    properties.forEach((property, index, properties) => {
      const lat = Number(property.lat);
      const lan = Number(property.lan);
      const marker = createHTMLMapMarker({
        latlng: new google.maps.LatLng(lat, lan),
        map: this.gmap.googleMap,
        x: lat,
        y: lan,
        markerData: property,
      });
      marker.setMap(this.gmap.googleMap as any);
      if (index === 0) {
        this.gmap.googleMap?.setCenter(new google.maps.LatLng(lat, lan));
        this.gmap.googleMap?.setZoom(4);
      }
      marker.addListener('click', () => {
        this.infoWindow?.close();
        this.infoWindowCmp(property).open(this.gmap.googleMap, marker);
      });
      this.markerClusterer?.addMarker(marker as any);
    });
  }

  public infoWindowCmp(data: any) {
    const infoWindowComponent = document.createElement(
      'app-google-info-window'
    ) as NgElement & WithProperties<{ data: string }>;
    infoWindowComponent.data = data;
    this.infoWindow = new google.maps.InfoWindow({
      content: infoWindowComponent,
    });
    return this.infoWindow;
  }

  // Helper
  public propertyTrackByFuc(index: number, el: any): number {
    return el.id;
  }
}
