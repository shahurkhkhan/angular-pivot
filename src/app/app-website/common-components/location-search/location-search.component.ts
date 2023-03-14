import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSelectModule} from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import {MatInputModule} from '@angular/material/input';

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
export class LocationSearchComponent {
  @HostBinding('class')
  public hostClass = 'app-location-search';
  public locations = ['Ahmedabad', 'Jodhpur', 'Pali Rajasthan'];
  public formGroup = new FormGroup({
    location: new FormControl('Ahmedabad'),
    search: new FormControl(''),
  })
}
