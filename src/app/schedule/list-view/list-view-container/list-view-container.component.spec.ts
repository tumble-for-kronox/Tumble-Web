import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewContainerComponent } from './list-view-container.component';

describe('ListViewContainerComponent', () => {
  let component: ListViewContainerComponent;
  let fixture: ComponentFixture<ListViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListViewContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
