import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar-container',
  templateUrl: './side-bar-container.component.html',
  styleUrls: ['./side-bar-container.component.scss']
})
export class SideBarContainerComponent {
  @Input() expanded!: boolean;
}
