import { Component, HostBinding, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Injector, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyFilterTileComponent } from './components/property-filter-tile/property-filter-tile.component';
import { PropertyTileComponent } from 'src/app/app-website/common-components/property-tile/property-tile.component';
import { MatSelectModule } from '@angular/material/select';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MapMarkerComponent } from './components/map-marker/map-marker.component';
import { createHTMLMapMarker } from './marker';
import { createCustomElement } from '@angular/elements';
import { PropertyStore } from './shared/services/property.store';
import * as utils from 'src/app/core/utils/common.utils';
import { NgrxdataModule } from 'src/app/shared/modules/ngrxdata/ngrxdata.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { SubSink } from 'subsink';
import { IProperty } from 'src/app/core/interfaces/property.interface';
import { IPropertyGetpayload } from './shared/interfaces/property.interface';
@Component({
  selector: 'app-property-section',
  standalone: true,
  imports: [
    CommonModule,
    PropertyFilterTileComponent,
    PropertyTileComponent,
    MatSelectModule,
    GoogleMapsModule,
    MapMarkerComponent,
    NgrxdataModule,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './property-section.component.html',
  styleUrls: ['./property-section.component.scss'],
})
export class PropertySectionComponent implements AfterViewInit, OnInit, AfterViewChecked, OnDestroy {
  @HostBinding('class')
  public hostClass = 'app-property-section d-block position-relative';
  // Filter State
  public utils = utils;
  public sectionSplitState: any;
  public filterTileHeight = 700;
  public subSink = new SubSink();
  // Ref
  @ViewChild('filterTile', {read: ElementRef<HTMLElement>})
  public filterTile!: ElementRef<HTMLElement>;
  @ViewChild(GoogleMap) map!: GoogleMap;
  public googleMapConfig!: google.maps.MapOptions;
  // APi
  public propertiesDataSelectors = this._propertyStore.useSelector<IProperty[]>({
    statusKey: 'list',
    moduleKey: 'properties',
    datakey: 'list'
  });
  public properties: any[] = [];
  // Map
  private markerClusterer!: MarkerClusterer;

  constructor(
    private injector: Injector,
    private _propertyStore: PropertyStore,
  ) {
    this.sectionSplitState = {} as any;
    this.sectionSplitState.filter = { width: '20%', show: true };
    this.sectionSplitState.map = { width: '40%', show: true };
    this.sectionSplitState.listing = { width: '40%', show: true };
    this.sectionSplit('filter');
  }

  ngOnInit(): void {
    this.customElements();
    this.getProperties();
  }

  ngAfterViewInit(): void {
    this.filterTileHeight = (this.filterTile?.nativeElement?.offsetHeight && this.filterTile?.nativeElement?.offsetHeight > 0) ? this.filterTile?.nativeElement?.offsetHeight : this.filterTileHeight;
    // Set Map Configration
    this.map.options = {
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      fullscreenControl: true,
      clickableIcons: false
    };
    // Cluster
    this.overlappingMarkerClusterer();
    // Set markers
    this.subSink.sink = this.propertiesDataSelectors.data$
    .subscribe((properties) => {
      this.setPropertiesMarker(properties)
    });
  }

  ngAfterViewChecked(): void {
    if (this.filterTileHeight !== this.filterTile?.nativeElement?.offsetHeight) {
      this.filterTileHeight = (this.filterTile?.nativeElement?.offsetHeight && this.filterTile?.nativeElement?.offsetHeight > 0) ? this.filterTile?.nativeElement?.offsetHeight : this.filterTileHeight;
    }
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  public sectionSplit(section: 'filter' | 'map' | 'listing' | 'mapListing' | 'all') {
    // Filter Toggle
    if (section === 'filter') {
      this.sectionSplitState.filter.width = this.sectionSplitState.filter.show
        ? '0%'
        : '20%';
      this.sectionSplitState.filter.show = !this.sectionSplitState.filter.show;

      if (this.sectionSplitState.map.show) {
        this.sectionSplitState.map.width = this.sectionSplitState.filter.show
        ? this.sectionSplitState.listing.show
          ? '40%'
          : '80%'
        : this.sectionSplitState.listing.show
        ? '60%'
        : '100%';
      }
      if (this.sectionSplitState.listing.show) {
        this.sectionSplitState.listing.width = this.sectionSplitState.filter.show
        ? this.sectionSplitState.map.show
          ? '40%'
          : '80%'
        : this.sectionSplitState.map.show
        ? '40%'
        : '100%';
      }

    }

    // Listing Toggle
    if (section === 'listing') {
      this.sectionSplitState.listing.width = this.sectionSplitState.listing.show
        ? '0'
        : '40%';
      this.sectionSplitState.listing.show =
        !this.sectionSplitState.listing.show;
      //
      this.sectionSplitState.map.width = this.sectionSplitState.listing.show
        ? this.sectionSplitState.filter.show
          ? '40%'
          : '60%'
        : this.sectionSplitState.filter.show
        ? '80%'
        : '100%';
    }

    // Map
    if (section === 'map') {
      this.sectionSplitState.listing.width = this.sectionSplitState.filter.show
        ? '80%'
        : '100%';
      this.sectionSplitState.listing.show = true;
      this.sectionSplitState.map.show = false;
      this.sectionSplitState.map.width = '0%';
    }

    // mapListing
    if (section === 'mapListing') {
      this.sectionSplitState.listing.show = true;
      this.sectionSplitState.map.show = true;
      this.sectionSplitState.listing.width = '40%';
      this.sectionSplitState.map.width = this.sectionSplitState.filter.show
        ? '40%'
        : '60%';
    }
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
  }

  /**
   * Scheduke and technicains clusterer overlay
   */
  private overlappingMarkerClusterer() {
    this.markerClusterer = new MarkerClusterer(this.map.googleMap as any, [], {
      imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      maxZoom: 4
    });
  }

  /**
   * Get Property
   * @param filterPayload
   */
  public filterProperties(
    filterPayload: any
  ) {
    this.getProperties(filterPayload)
  }

  private getProperties(payload?: IPropertyGetpayload) {
    this._propertyStore.getPropertiees({
      ...payload
    });
  }

  /***
   * Set Marker on map
   */
  private setPropertiesMarker(
    properties: IProperty[]
  ) {
    if (!properties) return;
    this.markerClusterer.clearMarkers();
    properties.forEach((property, index, properties) => {
      const lat = Number(property.lat);
      const lan = Number(property.lan);
      const marker = createHTMLMapMarker(
        {
          latlng: new google.maps.LatLng(lat, lan),
          map: this.map.googleMap,
          x: lat,
          y: lan,
          merkerData: property
        }
      );
      marker.setMap(this.map.googleMap as any);
      if (index === 0) {
        this.map.googleMap?.setCenter(new google.maps.LatLng(lat, lan))
        this.map.googleMap?.setZoom(4)
      }
      this.markerClusterer?.addMarker(marker as any);
    });
  }

  // Helper
  public propertyTrackByFuc(index:number, el:any): number {
    return el.id;
  }
}
