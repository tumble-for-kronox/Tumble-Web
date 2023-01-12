import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolOptionComponent } from './school-option.component';

describe('SchoolOptionComponent', () => {
  let component: SchoolOptionComponent;
  let fixture: ComponentFixture<SchoolOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
