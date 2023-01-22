import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekItemComponent } from './week-item.component';

describe('WeekItemComponent', () => {
  let component: WeekItemComponent;
  let fixture: ComponentFixture<WeekItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
