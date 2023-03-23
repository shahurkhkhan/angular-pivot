import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import { DeviceDetectService } from 'src/app/core/services/device-detect.service';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
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
  ]
})
export class PropertyFilterTileComponent {
  @HostBinding('class')
  public hostClass = `app-property-filter-tile bg-primary ${this._device.getMediaQueryName()}`;
  public formGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _device: DeviceDetectService
  ) {
    this.formGroup = this._formBuilder.group({
      property: ['lease'],
      location: ['Ahmedabad'],
      micromarket: ['Aslali - Bareja - Kheda'],
      propertyType: this._formBuilder.group({
        industrial: [false],
        warehouse: [false],
        land: [false]
      }),
      availability: this._formBuilder.group({
        readyBrownfield: [false],
        bTSGreenfield: [false]
      }),
      size: this._formBuilder.group({
        minSize: [15000],
        maxSize: [50000]
      }),
    })
  }
  // formSubmit
  public formSubmit() {
    console.log(this.formGroup)
  }
}
