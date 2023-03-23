import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-nx-data',
  templateUrl: './nx-data.component.html',
  styleUrls: ['./nx-data.component.scss']
})
export class NxDataComponent {
  @HostBinding('class')
  public hostClass = 'app-nx-data d-block';
}
