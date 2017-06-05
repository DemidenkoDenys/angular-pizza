import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PizzaInterface } from '../../services/pizza.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit{

  private _currentPrice: number;
  private _currentWeight: number;
  private _currentSize: number;

  @Input() item: PizzaInterface;
  @Input() limpid: number;
  @Input() indexPizza: number;

  @Output() limpidChange = new EventEmitter();

  constructor(private _orderService: OrderService){}

  ngOnInit(){
    this._currentPrice = Math.round(this.item.initPrice);
    this._currentWeight = Math.round(this.item.initWeight);
  }

  onSizeChecked(event){
    this._currentSize = event;

    this._currentPrice = Math.round(this.item.initPrice * event.priceRatio);
    this._currentWeight = Math.round(this.item.initWeight * event.weightRatio);
  }

  onMakeOrder(e){
    console.log(e.target.className);

    if(this.item.id === 0)
      this.scrollToCreator();

    if(this.item.id !== 0 && (e.currentTarget.className.indexOf('order-button') === 0 || e.target.className.indexOf('hidden-list-item') === 0))
      this._orderService.makeOrder(this.item, this._currentSize);
  }

  scrollToCreator(){
    let timer = setInterval(
      function(){
        window.scrollTo(0, $(window).scrollTop() + 15);
        if($(window).scrollTop() >= $('#creator').position().top)
          clearInterval(timer) },
     10);
  }

  openOnOver(event){
    this.limpidChange.emit(1);
  }

  openOnOut(event){
    this.limpidChange.emit(0);
  }

}
