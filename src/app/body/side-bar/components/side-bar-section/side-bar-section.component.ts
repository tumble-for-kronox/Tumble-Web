import { Component, Input } from '@angular/core';

@Component({
  selector: 'side-bar-section',
  templateUrl: './side-bar-section.component.html',
  styleUrls: ['./side-bar-section.component.scss']
})
export class SideBarSectionComponent {
  @Input() title!: string;
}
