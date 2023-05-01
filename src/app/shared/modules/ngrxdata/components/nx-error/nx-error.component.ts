import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-nx-error',
  templateUrl: './nx-error.component.html',
  styleUrls: ['./nx-error.component.scss']
})
export class NxErrorComponent {
  @HostBinding('class')
  public hostClass = 'app-nx-error d-block';
  @Input()
  public content: any;
  @Input()
  public isDefaultView = true;
}
