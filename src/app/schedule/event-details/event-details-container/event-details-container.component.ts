import { DatePipe } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import ScheduleEvent from 'src/app/models/scheduling/event';
import { BookmarkService } from 'src/app/shared/services/bookmark/bookmark.service';
import { ColorService } from '../../services/color/color.service';

@Component({
  selector: 'app-event-details-container',
  templateUrl: './event-details-container.component.html',
  styleUrls: ['./event-details-container.component.scss']
})
export class EventDetailsContainerComponent implements OnInit {
  @ViewChild('detailsContainer') detailsContainer!: ElementRef

  inVisibilityTransition: boolean = false
  private windowEdgeMargin: number = 20

  isShown: boolean = false
  currentX: number = 0
  currentY: number = 0
  datepipe: DatePipe = new DatePipe('en-US')
  event?: ScheduleEvent
  locationStrings?: string[]
  teacherStrings?: string[]
  fromSchedules?: string[]

  constructor(
    private renderer: Renderer2,
    private bookmarkService: BookmarkService,
    private colorService: ColorService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.isShown || this.inVisibilityTransition) return;

      if (e.composedPath().indexOf(this.detailsContainer.nativeElement) === -1) {
        this.isShown = false;
      }
    })

    this.renderer.listen('window', 'keyup.escape', (_e: Event) => {
      this.isShown = false;
    })
  }

  ngOnInit(): void {
  }

  async showEventDetails(event: any) {
    this.inVisibilityTransition = true
    this.setEvent(event.detail.event)
    this.isShown = true
    await new Promise(f => setTimeout(f, 1));
    if (!this.detailsContainer) return;
    this.currentX = this.getScreenSafeX(event.detail.x)
    this.currentY = this.getScreenSafeY(event.detail.y)
    this.inVisibilityTransition = false
  }

  closeEventDetails() {
    this.isShown = false
  }

  updateEventColor(newColor: string) {
    this.colorService.updateSingleColor(this.event!.course.id, newColor)
  }

  getEventColor(): string | undefined {
    if (this.event!.isSpecial) {
      return this.colorService.specialEventColor;
    }

    return this.colorService.currentColorsValue.get(this.event!.course.id);
  }

  getCourseColor(): string | undefined {
    return this.colorService.currentColorsValue.get(this.event!.course.id);
  }

  private setEvent(event: ScheduleEvent) {
    this.event = event
    this.locationStrings = event.locations.map(value => value.id)
    this.teacherStrings = event.teachers.map(value => value.firstName + " " + value.lastName)
    this.fromSchedules = event.scheduleIds.reduce<string[]>((array, element) => {
      for (const bookmark of this.bookmarkService.currentBookmarksValue) {
        if (bookmark.programme.id.includes(element)) {
          array.push(bookmark.programme.title)
        }
      }
      return array;
    }, [])
  }

  private getScreenSafeX(x: number) {
    const maxX: number = window.innerWidth
    const width = this.detailsContainer.nativeElement.offsetWidth

    if (x + width + this.windowEdgeMargin > maxX) {
      x = maxX - (width + this.windowEdgeMargin)
    }

    return x
  }

  private getScreenSafeY(y: number) {
    const maxY = window.innerHeight
    const height = this.detailsContainer.nativeElement.offsetHeight

    if (y + height + this.windowEdgeMargin > maxY) {
      y = maxY - (height + this.windowEdgeMargin)
    }

    return y
  }
}
