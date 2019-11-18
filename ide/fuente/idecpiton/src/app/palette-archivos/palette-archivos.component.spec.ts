import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteArchivosComponent } from './palette-archivos.component';

describe('PaletteArchivosComponent', () => {
  let component: PaletteArchivosComponent;
  let fixture: ComponentFixture<PaletteArchivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletteArchivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
