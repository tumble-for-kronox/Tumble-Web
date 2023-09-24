import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthViewContainerComponent } from './month-view-container.component';

describe('MonthViewContainerComponent', () => {
  let component: MonthViewContainerComponent;
  let fixture: ComponentFixture<MonthViewContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthViewContainerComponent]
    });
    fixture = TestBed.createComponent(MonthViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
