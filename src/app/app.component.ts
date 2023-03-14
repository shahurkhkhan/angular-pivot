import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-pivot';
  constructor(
    private meta: Meta,
    private router: Router
  ) {
    this.meta.addTags([
      {
        name: 'description',
        content: 'This is an article about Angular Meta service'
      },
      {
        name: 'keywords',
        content: 'angular, javascript, typescript, meta, seo'
      }
    ]);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
        if (!(event instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
  }
}
