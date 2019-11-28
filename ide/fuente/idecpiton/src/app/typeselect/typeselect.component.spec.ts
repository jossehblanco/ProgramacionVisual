import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeselectComponent } from './typeselect.component';

describe('TypeselectComponent', () => {
  let component: TypeselectComponent;
  let fixture: ComponentFixture<TypeselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
