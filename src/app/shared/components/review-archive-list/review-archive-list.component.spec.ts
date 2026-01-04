import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewArchiveListComponent } from './review-archive-list.component';

describe('ReviewArchiveListComponent', () => {
  let component: ReviewArchiveListComponent;
  let fixture: ComponentFixture<ReviewArchiveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewArchiveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewArchiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
