import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar-container',
  templateUrl: './side-bar-container.component.html',
  styleUrls: ['./side-bar-container.component.scss']
})
export class SideBarContainerComponent {
  @Input() expanded!: boolean;
  smallLayout!: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log("SMALL LAYOUT")
        this.smallLayout = true
      } else {
        console.log("LARGE LAYOUT")
        this.smallLayout = false
      }
    })
  }
}
