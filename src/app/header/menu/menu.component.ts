import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: string[] = [];

  constructor() {
    this.menus = ['Main', 'Pizza', 'Create', 'Order', 'Basket'];
  }

  ngOnInit() {
  }

}
