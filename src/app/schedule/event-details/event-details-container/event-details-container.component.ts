import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import ScheduleEvent from 'src/app/models/scheduling/event';

@Component({
  selector: 'app-event-details-container',
  templateUrl: './event-details-container.component.html',
  styleUrls: ['./event-details-container.component.scss']
})
export class EventDetailsContainerComponent {
  @ViewChild('detailsContainer') detailsContainer!: ElementRef

  private inVisibilityTransition: boolean = false
  private windowEdgeMargin: number = 20
  isShown: boolean = false
  currentX: number = 0
  currentY: number = 0
  event?: ScheduleEvent

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

  async showEventDetails(event: any) {
    console.log(event.detail)
    this.inVisibilityTransition = true
    this.event = event.detail.event
    this.isShown = true
    await new Promise(f => setTimeout(f, 5));
    this.currentX = this.getScreenSafeX(event.detail.x)
    this.currentY = this.getScreenSafeY(event.detail.y)
    this.inVisibilityTransition = false
  }

  getScreenSafeX(x: number) {
    const maxX: number = window.innerWidth
    const popUpWidth: number = this.detailsContainer.nativeElement.clientWidth

    if (x + popUpWidth > maxX) {
      x = maxX - (popUpWidth + this.windowEdgeMargin)
    }

    return x
  }

  getScreenSafeY(y: number) {
    const maxY = window.innerHeight
    const popUpHeight = this.detailsContainer.nativeElement.clientHeight

    if (y + popUpHeight > maxY) {
      y = maxY - (popUpHeight + this.windowEdgeMargin)
    }

    return y
  }
}
