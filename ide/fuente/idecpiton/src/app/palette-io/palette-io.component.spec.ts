import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteIOComponent } from './palette-io.component';

describe('PaletteIOComponent', () => {
  let component: PaletteIOComponent;
  let fixture: ComponentFixture<PaletteIOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletteIOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteIOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
