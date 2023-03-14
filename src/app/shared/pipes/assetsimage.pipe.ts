import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'assetsimage'
})
export class AssetsimagePipe implements PipeTransform {

  constructor(
  ) { }

  transform(
    value: string,
    imageFrom: 'local' | 's3' | 'icon' = 'local'
  ): string {
    // Value is wrong
    if (!value) return '';
    let url = '';
    switch (imageFrom) {
      case 'local':
        url = this.fromLocals(value);
        break;
      case 's3':
        url = this.fromS3(value);
        break;
      case 'icon':
        url = this.fromIcon(value);
        break;
      default:
        url = this.fromLocals(value);
    }
    return url;
  }

  /**
   * Get Image from assets
   * @param value : string like image name
   * @returns : assets/images/image.png
   */
  public fromLocals(
    value: string
  ) {
    return 'assets/images/' + value;
  }

  public fromIcon(
    value: string
  ) {
    let isSvgInclude = false;
    if (value.includes('.svg')) {
      isSvgInclude = true;
    }
    return `assets/icons/${value}${!isSvgInclude ? '.svg' : ''}`;
  }


  /**
   * Get From S3
   * @param value : string like image name
   * @returns : www.s3.com/images/image.png
   */
  private fromS3(value: string) {
    let url = '';
    if (value.indexOf('/') === 0) {
      value = value.replace('/', '');
      url = environment.ASSETS_BASE_URL + value;
    } else {
      url = environment.ASSETS_BASE_URL + value;
    }
    return url;
  }

}
