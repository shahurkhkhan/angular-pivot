import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SimpleStep } from './shared/interfaces/simple-step.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('splitAbleSection')
  public splitAbleSection!: ElementRef<HTMLElement>;

  public getSimpleAndEasySteps = (): SimpleStep[] => {
    return [
      {
        id: 1,
        title: 'Upload RFP',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit.'
      },
      {
        id: 2,
        title: 'View Properties',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit.'
      },
      {
        id: 3,
        title: 'Evaluate',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit.'
      },
      {
        id: 4,
        title: 'Pivot Will Manage',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit.'
      }
    ]
  }

  public sliderConfigration: OwlOptions = {
    items: 3,
    dots: false,
    margin: 0,
    nav: true,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']
  }


  constructor() {
  }

  ngAfterViewInit(): void {
  }



}
