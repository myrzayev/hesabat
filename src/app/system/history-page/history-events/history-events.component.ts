import { Component, Input, OnInit } from '@angular/core';

import { Category } from '../../shared/models/category.model';
import { MyrEvent } from '../../shared/models/event.model';

@Component({
  selector: 'myr-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() events: MyrEvent[] = [];
  searchValue = '';
  searchPlaceholder = 'Məbləğ';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    });
  }

  getEventClass(e: MyrEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Məbləğ',
      date: 'Tarix',
      category: 'Kateqoriya',
      type: 'Növü'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
