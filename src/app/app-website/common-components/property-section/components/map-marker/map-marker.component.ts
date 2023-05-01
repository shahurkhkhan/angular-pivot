import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { SharedPipesModule } from "../../../../../shared/pipes/shared-pipes.module";
import { IProperty } from 'src/app/core/interfaces/property.interface';

@Component({
    selector: 'app-map-marker',
    templateUrl: './map-marker.component.html',
    styleUrls: ['./map-marker.component.scss'],
    standalone: true,
    imports: [CommonModule, SharedPipesModule]
})
export class MapMarkerComponent implements OnInit {
  @HostBinding('class')
  public hostClass = 'app-map-marker';
  @Input()
  markerData: IProperty = {} as IProperty;
  // property appearance
  public propertyAppearance = {
    color: '#2dd632',
    icon: 'icn_land_f.png',
    isLandProperty: true,
    isWarehouseProperty: false,
    isIndustrialProperty: false
  }

  ngOnInit(): void {
   this.propertyAppearance.isLandProperty = this.markerData.types?.at(0).name === 'Land';
   this.propertyAppearance.isWarehouseProperty = this.markerData.types?.at(0).name === 'Warehouse';
   this.propertyAppearance.isIndustrialProperty = this.markerData.types?.at(0).name === 'Industrial';
   this.setPropertyMarkerIcon();
  }

  private setPropertyMarkerIcon () {
    if (this.propertyAppearance.isLandProperty) {
      this.propertyAppearance.icon = 'icn_land_map_pin.png';
      this.propertyAppearance.color = '#2dd632';
    }
    if (this.propertyAppearance.isWarehouseProperty) {
      this.propertyAppearance.icon = 'icn_warehouse_map_pin.png';
      this.propertyAppearance.color = '#4a60f9';
    }
    if (this.propertyAppearance.isIndustrialProperty) {
      this.propertyAppearance.icon = 'icn_industrial_map_pin.png';
      this.propertyAppearance.color = '#f94a4a';
    }
  }
}
