import { Component, HostBinding } from '@angular/core';
import { DeviceDetectService } from 'src/app/core/services/device-detect.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @HostBinding('class')
  public get hostClass () {
    return `app-layout app-layout-${this._deviceDetectService.getMediaQueryName()}`;
  };

  constructor(
    private _deviceDetectService: DeviceDetectService
  ) {
  }
}
