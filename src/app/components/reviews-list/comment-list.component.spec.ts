import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsListcomponent } from './index';

describe('ReviewsListcomponent', () => {
  let component: ReviewsListcomponent;
  let fixture: ComponentFixture<ReviewsListcomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsListcomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsListcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
