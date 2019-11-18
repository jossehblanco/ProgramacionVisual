import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteFuncionesComponent } from './palette-funciones.component';

describe('PaletteFuncionesComponent', () => {
  let component: PaletteFuncionesComponent;
  let fixture: ComponentFixture<PaletteFuncionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletteFuncionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteFuncionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
