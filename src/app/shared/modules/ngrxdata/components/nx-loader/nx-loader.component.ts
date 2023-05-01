import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-nx-loader',
  templateUrl: './nx-loader.component.html',
  styleUrls: ['./nx-loader.component.scss']
})
export class NxLoaderComponent {
  @HostBinding('class')
  public get hostClass  ()  {
    return `app-nx-loader d-block loader-${this.type}`
  };
  @Input()
  public type: 'normal' | 'again' = 'normal';
  @Input()
  public isDefault = false;
}
