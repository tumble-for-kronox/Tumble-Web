import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBtnComponent } from './account-btn.component';

describe('AccountBtnComponent', () => {
  let component: AccountBtnComponent;
  let fixture: ComponentFixture<AccountBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
