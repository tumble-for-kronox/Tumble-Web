import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DualActionItemComponent } from './dual-action-item.component';

describe('DualActionItemComponent', () => {
  let component: DualActionItemComponent;
  let fixture: ComponentFixture<DualActionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DualActionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DualActionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
