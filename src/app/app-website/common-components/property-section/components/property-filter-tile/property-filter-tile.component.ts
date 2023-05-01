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
  findRecord,
  getFilteredArray,
  getFilteredObject,
  propertyTypeIcons,
  slugify,
} from 'src/app/core/utils';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { PropertyStore } from '../../shared/services/property.store';
import { SubSink } from 'subsink';

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
      property: ['lease'],
      location: [],
      micromarket: [],
      propertyType: this._formBuilder.group({}),
      availability: this._formBuilder.group({}),
      size: this._formBuilder.group({
        minSize: [15000],
        maxSize: [50000],
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
    this.subSink.sink = this.formGroup
      .get('location')
      ?.valueChanges.subscribe((locationId) => {
        this._propertyStore.getMicroMarkets({ locationId });
      });

    this.subSink.sink = this.propertiesState.subscribe((propertyState: any) => {
      if (propertyState?.otherData?.queryPayload) {
        const {
          availability,
          location,
          micromarket,
          property,
          propertyType,
          size,
        } = propertyState?.otherData?.queryPayload;
        const [minSize, maxSize] = size?.split('-');
        const propertyTypeArr = propertyType?.split(',');
        const availabilityArr = availability?.split(',');
        this.formGroup.get('location')?.patchValue(location, {
          emitEvent: false
        });
        this.formGroup.get('micromarket')?.patchValue(micromarket);
        this.formGroup.get('property')?.patchValue(property);
        this.formGroup.get('size')?.patchValue({minSize,maxSize});
        if (propertyTypeArr.length) {
          const propertyTypeWithKeyValue = {} as any;
          propertyTypeArr.forEach((d: any) => {
            for (const key in this.pageState.propertyTypesKeyValue) {
              const element = this.pageState.propertyTypesKeyValue[key];
              if (Number(d) === Number(element)) {
                propertyTypeWithKeyValue[key] = true
              }
            }
          })
          this.formGroup.get('propertyType')?.patchValue(propertyTypeWithKeyValue);
        }
        if (availabilityArr.length) {
          const availabilityWithKeyValue = {} as any;
          availabilityArr.forEach((d: any) => {
            for (const key in this.pageState.availabilitsKeyValue) {
              const element = this.pageState.availabilitsKeyValue[key];
              if (Number(d) === Number(element)) {
                availabilityWithKeyValue[key] = true
              }
            }
          })
          this.formGroup.get('availability')?.patchValue(availabilityWithKeyValue);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  // formSubmit
  public formSubmit() {
    const {
      propertyType,
      availability,
      size: { minSize, maxSize },
    } = this.formGroup.value;
    const selectedPropertyType = getFilteredObject(propertyType, true);
    const selectedAvailability = getFilteredObject(availability, true);

    this.filter.emit({
      ...this.formGroup.value,
      propertyType: Object.keys(selectedPropertyType)
        .map((k) => this.pageState.propertyTypesKeyValue[k])
        .join(','),
      availability: Object.keys(selectedAvailability)
        .map((k) => this.pageState.availabilitsKeyValue[k])
        .join(','),
      size: `${minSize}-${maxSize}`,
    });
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
}
