import { Component, ViewChild } from '@angular/core';
import { BasketComponent } from './basket/basket.component';


@Component({
  templateUrl: './header.component.html',
  selector: 'app-header',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  title: string = 'Dream Pizza';
  basketShow: boolean = false;

  @ViewChild(BasketComponent) childComponent: BasketComponent;

  public logoImage = require('../img/logo.png');

  onShowBasket(){
    if(!this.basketShow)
      this.childComponent.unpdateBasket();
    this.basketShow = !this.basketShow;
  }

  onHideBasket(){
    this.basketShow = false;
  }
}
