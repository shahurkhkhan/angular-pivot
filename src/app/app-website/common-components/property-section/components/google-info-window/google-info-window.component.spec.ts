import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleInfoWindowComponent } from './google-info-window.component';

describe('GoogleInfoWindowComponent', () => {
  let component: GoogleInfoWindowComponent;
  let fixture: ComponentFixture<GoogleInfoWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleInfoWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
