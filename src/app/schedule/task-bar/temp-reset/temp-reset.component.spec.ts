import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempResetComponent } from './temp-reset.component';

describe('TempResetComponent', () => {
  let component: TempResetComponent;
  let fixture: ComponentFixture<TempResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
