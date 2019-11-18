import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteInicioComponent } from './palette-inicio.component';

describe('PaletteInicioComponent', () => {
  let component: PaletteInicioComponent;
  let fixture: ComponentFixture<PaletteInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletteInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
