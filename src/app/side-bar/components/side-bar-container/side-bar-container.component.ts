import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar-container',
  templateUrl: './side-bar-container.component.html',
  styleUrls: ['./side-bar-container.component.scss']
})
export class SideBarContainerComponent {
  @Output() expandedEvent = new EventEmitter<void>();
  @Input() expanded!: boolean;

  toggleExpanded() {
    this.expandedEvent.emit();
  }
}
