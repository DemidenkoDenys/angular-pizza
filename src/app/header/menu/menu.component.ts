import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: string[] = [];
  @Output() showBasket = new EventEmitter();

  constructor() {
    this.menus = ['Main', 'Pizza', 'Create', 'Order'];
  }

  ngOnInit(){}

  onShowBasket(e: Event){
    e.preventDefault();
    this.showBasket.emit(true);
  }

}
