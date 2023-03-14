import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';

@Component({
  selector: 'app-micro-market-filter-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSliderModule,
    ReactiveFormsModule,
    SharedPipesModule,
    MatInputModule
  ],
  templateUrl: './micro-market-filter-form.component.html',
  styleUrls: ['./micro-market-filter-form.component.scss']
})
export class MicroMarketFilterFormComponent {
  @HostBinding('class')
  public hostClass = 'app-micro-market-filter-form d-block bg-primary';
  public formGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.formGroup = this._formBuilder.group({
      property: ['logistics'],
      location: ['Ahmedabad'],
      micromarket: ['Aslali - Bareja - Kheda'],
      search: [''],
    })
  }
  // formSubmit
  public formSubmit() {
    console.log(this.formGroup)
  }
}
