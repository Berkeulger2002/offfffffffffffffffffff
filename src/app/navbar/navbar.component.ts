import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent {
  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(category: string): void {
    this.categorySelected.emit(category); // Emit the selected category
  }
}
