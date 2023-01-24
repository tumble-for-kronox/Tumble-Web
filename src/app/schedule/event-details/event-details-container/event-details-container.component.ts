import { DatePipe } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import ScheduleEvent from 'src/app/models/scheduling/event';

@Component({
  selector: 'app-event-details-container',
  templateUrl: './event-details-container.component.html',
  styleUrls: ['./event-details-container.component.scss']
})
export class EventDetailsContainerComponent implements OnInit {
  @ViewChild('detailsContainer') detailsContainer!: ElementRef

  private inVisibilityTransition: boolean = false
  private windowEdgeMargin: number = 20
  private popUpWidth = 480
  private popUpHeight = 800

  isShown: boolean = false
  currentX: number = 0
  currentY: number = 0
  datepipe: DatePipe = new DatePipe('en-US')
  event?: ScheduleEvent
  locationStrings?: string[]
  teacherStrings?: string[]

  constructor(private renderer: Renderer2) {
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
    this.locationStrings
  }

  async showEventDetails(event: any) {
    console.log(event.detail)
    this.inVisibilityTransition = true
    this.setEvent(event.detail.event)
    this.isShown = true
    this.currentX = this.getScreenSafeX(event.detail.x)
    this.currentY = this.getScreenSafeY(event.detail.y)
    await new Promise(f => setTimeout(f, 1));
    this.inVisibilityTransition = false
  }

  closeEventDetails() {
    this.isShown = false
  }

  private setEvent(event: ScheduleEvent) {
    this.event = event
    this.locationStrings = event.locations.map(value => value.id)
    this.teacherStrings = event.teachers.map(value => value.firstName + " " + value.lastName)
  }

  private getScreenSafeX(x: number) {
    const maxX: number = window.innerWidth

    if (x + this.popUpWidth > maxX) {
      x = maxX - (this.popUpWidth + this.windowEdgeMargin)
    }

    return x
  }

  private getScreenSafeY(y: number) {
    const maxY = window.innerHeight

    if (y + this.popUpHeight > maxY) {
      y = maxY - (this.popUpHeight + this.windowEdgeMargin)
    }

    return y
  }
}
