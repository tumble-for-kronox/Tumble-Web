import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBarContainerComponent } from './task-bar-container.component';

describe('TaskBarContainerComponent', () => {
  let component: TaskBarContainerComponent;
  let fixture: ComponentFixture<TaskBarContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskBarContainerComponent]
    });
    fixture = TestBed.createComponent(TaskBarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
