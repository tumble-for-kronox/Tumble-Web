import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksContainerComponent } from './bookmarks-container.component';

describe('BookmarksContainerComponent', () => {
  let component: BookmarksContainerComponent;
  let fixture: ComponentFixture<BookmarksContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarksContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
