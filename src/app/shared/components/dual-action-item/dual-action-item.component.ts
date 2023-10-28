import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'side-bar-dual-action-item',
  templateUrl: './dual-action-item.component.html',
  styleUrls: ['./dual-action-item.component.scss']
})
export class DualActionItemComponent {
  @Input() title!: string;
  @Output() primaryAction = new EventEmitter<void>();
  @Output() secondaryAction = new EventEmitter<void>();


  triggerPrimaryAction() {
    this.primaryAction.emit();
  }

  triggerSecondaryAction() {
    this.secondaryAction.emit();
  }
}
