import {Component} from '@angular/core';
import {MatList, MatListItem} from '@angular/material/list';
import {IItem} from './types/item.type';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-root',
  imports: [FormsModule, MatInput, MatFormField, MatButton, MatCheckbox, MatList, MatListItem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  items: IItem[] = [];
  selectedItems: IItem[] = [];
  value: string = '';
  enableAdd: boolean = false;

  addItem() {
    this.items.push({name: this.value, selected: false, hidden: false});
    this.resetSearch();
  }

  removeItems() {
    for (let i = this.selectedItems.length - 1; i >= 0; i--) {
      this.items.splice(this.items.indexOf(this.selectedItems[i]), 1);
      this.selectedItems.splice(i, 1);
    }
    this.resetSearch();
  }

  filterItems() {
    if (this.value == '') {
      this.resetSearch();
      return;
    }
    this.enableAdd = false;
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i].name == this.value) {
        this.items[i].hidden = false;
        this.enableAdd = true;
      } else {
        this.items[i].hidden = true;
      }
    }
  }

  selectItem(checked: boolean, item: IItem) {
    item.selected = checked
    if (checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    }
  }

  resetSearch() {
    if (this.value != '') {
      this.value = '';
    }
    for (let i = this.items.length - 1; i >= 0; i--) {
      this.items[i].hidden = false;
    }
  }
}
