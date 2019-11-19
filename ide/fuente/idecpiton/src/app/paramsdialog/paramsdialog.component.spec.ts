import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsdialogComponent } from './paramsdialog.component';

describe('ParamsdialogComponent', () => {
  let component: ParamsdialogComponent;
  let fixture: ComponentFixture<ParamsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
