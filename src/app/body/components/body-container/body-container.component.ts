import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-container',
  templateUrl: './body-container.component.html',
  styleUrls: ['./body-container.component.scss']
})
export class BodyContainerComponent {
  @Input() expandedSideBar!: boolean;
}
