import { Component } from '@angular/core';

@Component({
  selector: 'app-body-container',
  templateUrl: './body-container.component.html',
  styleUrls: ['./body-container.component.scss']
})
export class BodyContainerComponent {
  expandedSideBar: boolean = true;

  toggleExpandedSideBar() {
    this.expandedSideBar = !this.expandedSideBar;
  }
}
