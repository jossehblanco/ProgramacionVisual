import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteFlujoComponent } from './palette-flujo.component';

describe('PaletteFlujoComponent', () => {
  let component: PaletteFlujoComponent;
  let fixture: ComponentFixture<PaletteFlujoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletteFlujoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteFlujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
