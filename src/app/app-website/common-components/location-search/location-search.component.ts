import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSelectModule} from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import {MatInputModule} from '@angular/material/input';
import { ILocation } from '../../pages/home/shared/interfaces/micro-market.interface';
import * as utils from 'src/app/core/utils';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-location-search',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedPipesModule,
    MatInputModule
  ],
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit, OnChanges {
  @HostBinding('class')
  public hostClass = 'd-block app-location-search';
  @Input()
  public locations: ILocation[] = [];
  @Output()
  public filter = new EventEmitter<any>();
  // Private
  private subSink = new SubSink();
  // Public
  public utils = utils;
  public formGroup = new FormGroup({
    location: new FormControl(''),
    search: new FormControl(''),
  })

  constructor() {
    this.fillterChange();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['locations'].firstChange &&
      changes['locations'].previousValue !== changes['locations'].currentValue
    ) {
      this.formGroup.get('location')?.patchValue(this.locations.at(0)?.id as unknown as string)
    }
  }

  /**
   * @description
   * Filter Change handler
   */
  public fillterChange() {
    this.subSink.sink = this.formGroup.get('search')?.valueChanges
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((searchQuery) => this.filter.emit({
      ...this.formGroup.value,
      search: searchQuery
    }))

    this.subSink.sink = this.formGroup.get('location')?.valueChanges
    .pipe(filter(d => d !== ''))
    .subscribe((locationId) => this.filter.emit({
      ...this.formGroup.value,
      location: locationId
    }))
  }
}
