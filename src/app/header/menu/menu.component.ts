import { Component } from '@angular/core';

interface Menus {
  name: string,
  link: string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{

  private menus: Menus[];

  constructor(){
    this.menus = [
      { name: 'Главная', link: 'header' },
      { name: 'Готовая пицца', link: 'list'  },
      { name: 'Собрать', link: 'creator'  },
      { name: 'Заказать', link: 'order'  }
    ];
  }
}
