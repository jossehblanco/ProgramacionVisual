import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogCComponent } from './mat-dialog-c.component';

describe('MatDialogCComponent', () => {
  let component: MatDialogCComponent;
  let fixture: ComponentFixture<MatDialogCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatDialogCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDialogCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
