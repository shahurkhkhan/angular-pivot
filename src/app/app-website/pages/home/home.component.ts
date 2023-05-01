import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SimpleStep } from './shared/interfaces/simple-step.interface';
import { HomeStore } from './shared/stores/home.store';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('splitAbleSection')
  public splitAbleSection!: ElementRef<HTMLElement>;

  public getSimpleAndEasySteps: SimpleStep[] = [
    {
      id: 1,
      title: 'Upload RFP',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
    {
      id: 2,
      title: 'View Properties',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
    {
      id: 3,
      title: 'Evaluate',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
    {
      id: 4,
      title: 'Pivot Will Manage',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
  ];

  public sliderConfigration: OwlOptions = {
    items: 3,
    dots: false,
    margin: 0,
    nav: true,
    loop: true,
    navText: [
      '<i class="fa fa-arrow-left"></i>',
      '<i class="fa fa-arrow-right"></i>',
    ],
  };

  // APi
  public testimonialSelectors = this._homeStore.useSelector({
    statusKey: 'list',
    datakey: 'list',
    moduleKey: 'testimonials',
  });
  public microMarketSelectors = this._homeStore.useSelector({
    statusKey: 'list',
    datakey: 'list',
    moduleKey: 'microMarkets',
  });
  public locationsSelectors = this._homeStore.useSelector({
    statusKey: 'list',
    datakey: 'list',
    moduleKey: 'locations',
  });

  constructor(private _homeStore: HomeStore) {
    this._homeStore.getTestimonial({});
    this._homeStore.getlocations({});
  }

  /**
   * Ger Markets
   * @param locationId : number
   * @param queryParams : any
   */
  private getMicroMarket(locationId: string, queryParams = {}) {
    this._homeStore.getMicroMarkets({ locationId, query: queryParams });
  }

  /**
   * Filter Micromarkets
   * @param { search, location }
   */
  public microMarketFilter({ search, location }: any) {
    this.getMicroMarket(location, {
      name: search,
    });
  }
}
