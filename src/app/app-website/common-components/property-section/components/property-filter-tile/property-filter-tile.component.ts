import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { DeviceDetectService } from 'src/app/core/services/device-detect.service';
import {
  findObjectKey,
  findRecord,
  getFilteredArray,
  propertyTypeIcons,
  slugify,
} from 'src/app/core/utils';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { PropertyStore } from '../../shared/services/property.store';
import { SubSink } from 'subsink';
import { IProperty } from 'src/app/core/interfaces/property.interface';
import { filter } from 'rxjs';

interface IPropertyFilterTileComponentPageState {
  propertyTypes: any[];
  availability: any[];
  locations: any[];
  markets: any[];
  propertyTypesKeyValue: any;
  availabilitsKeyValue: any;
}

@Component({
  selector: 'app-property-filter-tile',
  templateUrl: './property-filter-tile.component.html',
  styleUrls: ['./property-filter-tile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSliderModule,
    ReactiveFormsModule,
    SharedPipesModule,
  ],
})
export class PropertyFilterTileComponent implements OnDestroy {
  @HostBinding('class')
  public hostClass = `app-property-filter-tile bg-primary ${this._device.getMediaQueryName()}`;
  // Instance
  public subSink = new SubSink();
  // Public
  public formGroup: FormGroup;
  public propertyTypeIcons = propertyTypeIcons;
  public utils = { slugify, findRecord };
  public lastAppliedFilters = {} as any;
  public pageState: IPropertyFilterTileComponentPageState = {
    propertyTypesKeyValue: {},
    availabilitsKeyValue: {},
  } as IPropertyFilterTileComponentPageState;

  @Output()
  public filter = new EventEmitter<any>();
  // Selectors
  public staticDataSelectors = this._propertyStore.useSelector<any[]>({
    statusKey: 'list',
    datakey: 'list',
    moduleKey: 'staticData',
  });
  public locationsSelectors = this._propertyStore.useSelector<any[]>({
    statusKey: 'list',
    datakey: 'list',
    moduleKey: 'locations',
  });
  public marketsSelectors = this._propertyStore.useSelector<any[]>({
    statusKey: 'list',
    datakey: 'list',
    moduleKey: 'microMarkets',
  });
  public propertiesState = this._propertyStore.moduleState('properties');
  public propertiesDataSelectors = this._propertyStore.useSelector<IProperty[]>({
    statusKey: 'list',
    moduleKey: 'properties',
    datakey: 'list'
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _device: DeviceDetectService,
    private _propertyStore: PropertyStore
  ) {
    // Api Call
    this._propertyStore.getStaticData({});
    this._propertyStore.getlocations({});

    // Form
    this.formGroup = this._formBuilder.group({
      property: [undefined],
      location: [undefined],
      micromarket: [undefined],
      propertyType: this._formBuilder.group({}),
      availability: this._formBuilder.group({}),
      size: this._formBuilder.group({
        minSize: [10000],
        maxSize: [120000],
      }),
    });

    // Add Controls for propertyTypes and Availabilits
    this.subSink.sink = this.staticDataSelectors.data$.subscribe(
      (staticData) => {
        this.pageState.propertyTypes = getFilteredArray(
          staticData,
          'slug',
          'property_type'
        );
        this.pageState.availability = getFilteredArray(
          staticData,
          'slug',
          'availability'
        );
        this.addPropertyFormControls();
        this.addAvailabilityFormControls();
      }
    );

    // Location Change
    this.subSink.sink = this.formGroup.get('location')?.valueChanges
    .pipe(filter(d => !!d))
    .subscribe((locationId) => this._propertyStore.getMicroMarkets({ locationId }));

    this.subSink.sink = this._propertyStore.filterPayload$
    .pipe(filter(d => !!d))
    .subscribe((queryPayload: any) => {
      this.lastAppliedFilters = queryPayload ?? {};
      const {
        availability = undefined,
        location = undefined,
        micromarket = undefined,
        type = undefined,
        borl = undefined,
        sizeMin = 10000,
        sizeMax = 120000,
      } = this.lastAppliedFilters;
      this.formGroup.get('location')?.patchValue(location, {
        emitEvent: false
      });
      this.formGroup.get('micromarket')?.patchValue(micromarket);
      this.formGroup.get('property')?.patchValue(borl);
      this.formGroup.get('size')?.patchValue({minSize: sizeMin, maxSize: sizeMax});

      const propertyTypeWithKeyValue = {} as any;
      for (const key in this.pageState.propertyTypesKeyValue) {
        const element = this.pageState.propertyTypesKeyValue[key];
        propertyTypeWithKeyValue[key] = Number(type) === Number(element)
      }
      const availabilityWithKeyValue = {} as any;
      for (const key in this.pageState.availabilitsKeyValue) {
        const element = this.pageState.availabilitsKeyValue[key];
        availabilityWithKeyValue[key] = Number(availability) === Number(element);
      }
      this.formGroup.get('propertyType')?.patchValue(propertyTypeWithKeyValue);
      this.formGroup.get('availability')?.patchValue(availabilityWithKeyValue);
    });
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  private formValueToFilterObj () {
    const {
      location,
      micromarket,
      property,
      propertyType,
      availability,
      size: { minSize, maxSize },
    } = this.formGroup.value;

    const selectedType = this.pageState.propertyTypesKeyValue[findObjectKey(propertyType, true) as string];
    const selectedAvailability = this.pageState.availabilitsKeyValue[findObjectKey(availability, true) as string];
    const filterObj = {
      sizeMin: Number(minSize),
      sizeMax: Number(maxSize),
    } as any;

    if ( ![null, undefined, ''].includes(property) ) {
      filterObj.borl = Number(property);
    }
    if ( ![null, undefined, ''].includes(location) ) {
      filterObj.location = Number(location);
    }
    if ( ![null, undefined, ''].includes(micromarket) ) {
      filterObj.micromarket = Number(micromarket);
    }
    if ( ![null, undefined, ''].includes(selectedType) ) {
      filterObj.type = Number(selectedType);
    }
    if ( ![null, undefined, ''].includes(selectedAvailability) ) {
      filterObj.availability = Number(selectedAvailability);
    }
    return filterObj;
  }
  // formSubmit
  public formSubmit() {
    if ( this.isFormHasChanges() ) {
      this.filter.emit(this.formValueToFilterObj());
      window.scrollTo({top: 0});
    }
  }

  public resetForm() {
    this.filter.emit({});
    this.formGroup.reset({
      borl: 0,
      size: {
        minSize:10000,
        maxSize:120000
      }
    });
    window.scrollTo({top: 0});
  }

  private isFormHasChanges () {
    return (
      JSON.stringify(this.formValueToFilterObj())
      !==
      JSON.stringify(this.lastAppliedFilters)
    )
  }

  // Helper
  public addPropertyFormControls() {
    if (!this.pageState.propertyTypes) return;
    this.pageState.propertyTypes.forEach((property) => {
      const slug = slugify(property.name);
      this.pageState.propertyTypesKeyValue[slug] = property.id;
      (this.formGroup.get('propertyType') as FormGroup).addControl(
        slug,
        new FormControl(false)
      );
    });
  }
  public addAvailabilityFormControls() {
    if (!this.pageState.availability) return;
    this.pageState.availability.forEach((property) => {
      const slug = slugify(property.name);
      this.pageState.availabilitsKeyValue[slug] = property.id;
      (this.formGroup.get('availability') as FormGroup).addControl(
        slug,
        new FormControl(false)
      );
    });
  }
  public checkboxToRadio(event: any, controlName: string, groupName: string) {
    const allPropertyTypesControls =  (this.formGroup.get(groupName) as FormGroup).controls;
    for (const controlkey in allPropertyTypesControls) {
      if (controlkey !== controlName) {
        allPropertyTypesControls[controlkey].patchValue(false);
      }
    }
  }
}
