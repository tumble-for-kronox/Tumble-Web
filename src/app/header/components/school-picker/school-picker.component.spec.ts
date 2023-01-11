import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolPickerComponent } from './school-picker.component';

describe('SchoolPickerComponent', () => {
  let component: SchoolPickerComponent;
  let fixture: ComponentFixture<SchoolPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
