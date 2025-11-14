import {Component} from '@angular/core';
import {MatList, MatListItem} from '@angular/material/list';
import {IItem} from './types/item.type';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, MatInput, MatFormField, MatButton, MatCheckbox, MatList, MatListItem, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  items: IItem[] = [];
  value: string = '';
  enableAdd: boolean = false;

  addItem() {
    this.items.push({name: this.value, selected: false, hidden: false});
    this.showAllItems();
  }

  removeItems() {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i].selected) {
        this.items.splice(i, 1);
      }
    }
    this.showAllItems();
  }

  filterItems() {
    if (this.value == '') return;
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

  updateItem(checked: boolean, item: IItem) {
    item.selected = checked;
  }

  showAllItems() {
    this.value = '';
    for (let i = this.items.length - 1; i >= 0; i--) {
      this.items[i].hidden = false;
    }
  }
}
