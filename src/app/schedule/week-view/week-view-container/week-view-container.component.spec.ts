import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekViewContainerComponent } from './week-view-container.component';

describe('WeekViewContainerComponent', () => {
  let component: WeekViewContainerComponent;
  let fixture: ComponentFixture<WeekViewContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekViewContainerComponent]
    });
    fixture = TestBed.createComponent(WeekViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
