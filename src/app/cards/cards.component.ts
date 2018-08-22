import { Component, OnInit } from '@angular/core';

import { SHORT_CARDS } from './mock-short-cards';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards = SHORT_CARDS;

  constructor() { }

  ngOnInit() {
  }

}
