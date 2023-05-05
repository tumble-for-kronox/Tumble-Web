import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarSectionComponent } from './side-bar-section.component';

describe('SideBarSectionComponent', () => {
  let component: SideBarSectionComponent;
  let fixture: ComponentFixture<SideBarSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
