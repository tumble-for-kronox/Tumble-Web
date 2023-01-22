import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleContainerComponent } from './schedule-container.component';

describe('ScheduleContainerComponent', () => {
  let component: ScheduleContainerComponent;
  let fixture: ComponentFixture<ScheduleContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
