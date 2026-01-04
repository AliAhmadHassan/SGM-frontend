import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRmaComponent } from './approve-rma.component';

describe('ApproveRmaComponent', () => {
  let component: ApproveRmaComponent;
  let fixture: ComponentFixture<ApproveRmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
