import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalRecipientComponent } from './final-recipient.component';

describe('FinalRecipientComponent', () => {
  let component: FinalRecipientComponent;
  let fixture: ComponentFixture<FinalRecipientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalRecipientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
