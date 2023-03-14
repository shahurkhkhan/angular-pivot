import { Component, HostBinding, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyFilterTileComponent } from '../property-filter-tile/property-filter-tile.component';
import { PropertyTileComponent } from 'src/app/app-website/common-components/property-tile/property-tile.component';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-property-section',
  standalone: true,
  imports: [CommonModule, PropertyFilterTileComponent, PropertyTileComponent, MatSelectModule],
  templateUrl: './property-section.component.html',
  styleUrls: ['./property-section.component.scss'],
})
export class PropertySectionComponent implements AfterViewInit {
  @HostBinding('class')
  public hostClass = 'app-property-section d-block position-relative';
  // Filter State
  public sectionSplitState: any;
  public filterTileHeight = 700;
  // Ref
  @ViewChild('filterTile', {read: ElementRef<HTMLElement>})
  public filterTile!: ElementRef<HTMLElement>;
  constructor() {
    this.sectionSplitState = {} as any;
    this.sectionSplitState.filter = { width: '20%', show: true };
    this.sectionSplitState.map = { width: '40%', show: true };
    this.sectionSplitState.listing = { width: '40%', show: true };
  }


  ngAfterViewInit(): void {
    this.filterTileHeight = (this.filterTile?.nativeElement?.offsetHeight && this.filterTile?.nativeElement?.offsetHeight > 0) ? this.filterTile?.nativeElement?.offsetHeight : this.filterTileHeight;
  }

  public sectionSplit(section: 'filter' | 'map' | 'listing' | 'mapListing') {
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
}
