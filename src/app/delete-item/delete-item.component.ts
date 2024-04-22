import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'delete-item',
  standalone: true,
  imports: [],
  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.css',
})
export class DeleteItemComponent {
  @Input({ required: true }) itemId: number = 0;
  @Output() itemDeleted = new EventEmitter<number>();

  deleteItem(itemId: number) {
    this.itemDeleted.emit(itemId);
  }
}
