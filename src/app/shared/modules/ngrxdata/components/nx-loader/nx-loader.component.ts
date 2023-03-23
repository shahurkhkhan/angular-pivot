import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-nx-loader',
  templateUrl: './nx-loader.component.html',
  styleUrls: ['./nx-loader.component.scss']
})
export class NxLoaderComponent {
  @HostBinding('class')
  public hostClass = 'app-nx-loader d-block';
}
