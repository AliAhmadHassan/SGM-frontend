import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateStmComponent } from './form-create-stm.component';

describe('FormCreateStmComponent', () => {
  let component: FormCreateStmComponent;
  let fixture: ComponentFixture<FormCreateStmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCreateStmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateStmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
