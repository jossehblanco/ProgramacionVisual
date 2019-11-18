import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteVariablesComponent } from './palette-variables.component';

describe('PaletteVariablesComponent', () => {
  let component: PaletteVariablesComponent;
  let fixture: ComponentFixture<PaletteVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletteVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
