import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSchedulesComponent } from './selected-schedules.component';

describe('SelectedSchedulesComponent', () => {
  let component: SelectedSchedulesComponent;
  let fixture: ComponentFixture<SelectedSchedulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedSchedulesComponent]
    });
    fixture = TestBed.createComponent(SelectedSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
