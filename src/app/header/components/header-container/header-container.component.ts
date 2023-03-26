import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss']
})
export class HeaderContainerComponent implements OnInit {
  public showLargeSearch!: boolean;
  public showSmallSearch!: boolean;

  @Input() expandedSideBar!: boolean;
  @Output() expandedEvent = new EventEmitter<void>()

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.showLargeSearch = false;
        this.showSmallSearch = true;
      } else {
        this.showLargeSearch = true;
        this.showSmallSearch = false;
      }
    })
  }

  toggleExpandedSidebar() {
    this.expandedEvent.emit();
  }
}
