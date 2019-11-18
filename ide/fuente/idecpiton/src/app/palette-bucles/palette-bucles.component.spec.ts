import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteBuclesComponent } from './palette-bucles.component';

describe('PaletteBuclesComponent', () => {
  let component: PaletteBuclesComponent;
  let fixture: ComponentFixture<PaletteBuclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletteBuclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteBuclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
