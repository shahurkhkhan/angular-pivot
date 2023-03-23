import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

type IDevice = 'XLarge' | 'Large' | 'Medium' | 'Small' | 'XSmall' | 'Handset' | 'Tablet' | 'Web';
type IMediaQuery = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
const mediaSizes = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}
@Injectable({
  providedIn: 'root'
})
export class DeviceDetectService {
  public hostClasses: string = 'auth-layout';
  isXXLarge$: Observable<boolean> = this.getDevice('XLarge'); // above 1920
  isXLarge$: Observable<boolean>  = this.getDevice('XLarge'); // above 1920
  isLarge$: Observable<boolean>   = this.getDevice('Large'); // small 1920 to 1280
  isMedium$: Observable<boolean>  = this.getDevice('Medium'); // small 1279 to 960
  isSmall$: Observable<boolean>   = this.getDevice('Small'); // small 959 to 600
  isXSmall$: Observable<boolean>  = this.getDevice('XSmall'); // small 599 to 0
  isHandset$: Observable<boolean> = this.getDevice('Handset'); // Handset
  isTablet$: Observable<boolean>  = this.getDevice('Tablet'); // Tablet
  isWeb$: Observable<boolean>     = this.getDevice('Web'); // Web
  constructor(
    private breakpointObserver: BreakpointObserver,
    private mediaMatcher: MediaMatcher
  ) {
  }
  /**
   * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
   *                  Setter
   * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
   */
  /**
   * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
   *                  Getter
   * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
   */
  public getDevice(deviceType: IDevice): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints[deviceType])
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }
  public getBreakpointUp(mediaQuery: IMediaQuery): any {
    return this.mediaMatcher.matchMedia(`(min-width: ${mediaSizes[mediaQuery]}px)`)?.matches;
  }
  public getBreakpointDown(mediaQuery: IMediaQuery): any {
    return this.mediaMatcher.matchMedia(`(max-width: ${mediaSizes[mediaQuery] - 1}px)`)?.matches;
  }
  public getMediaQueryName(): any {
    if (window.innerWidth >= mediaSizes.xxl) {
      return 'xxl';
    }
    if (window.innerWidth >= mediaSizes.xl) {
      return 'xl';
    }
    if (window.innerWidth >= mediaSizes.lg) {
      return 'lg';
    }
    if (window.innerWidth >= mediaSizes.md) {
      return 'md';
    }
    if (window.innerWidth >= mediaSizes.sm) {
      return 'sm';
    }
    if (window.innerWidth >= mediaSizes.xs) {
      return 'xs';
    }
  }
}
