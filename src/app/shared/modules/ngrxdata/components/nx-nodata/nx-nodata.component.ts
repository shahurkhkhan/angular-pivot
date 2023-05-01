import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-nx-nodata',
  templateUrl: './nx-nodata.component.html',
  styleUrls: ['./nx-nodata.component.scss']
})
export class NxNodataComponent {
  @HostBinding('class')
  public hostClass = 'app-nx-error d-block';
  @Input()
  public content: any;
  @Input()
  public isDefaultView = true;
}
