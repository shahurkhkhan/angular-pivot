import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';

@Component({
  selector: 'app-property-find-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatFormFieldModule, NgxDropzoneModule,
     SharedPipesModule
  ],
  templateUrl: './property-find-form.component.html',
  styleUrls: ['./property-find-form.component.scss'],
})
export class PropertyFindFormComponent {
  @HostBinding('class')
  public hostClass = 'app-property-find-form';
}
