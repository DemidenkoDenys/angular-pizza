import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit{

  private _currentPrice;
  private _currentWeight;
  private _currentSize;
  private _open: boolean = false;

  @Output() hoveredPizza = new EventEmitter();
  @Output() outsidePizza = new EventEmitter();

  @Input() item;
  @Input() limpid;
  @Input() indexPizza;

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

  onMakeOrder(item, e){
    if(!item.id)
      window.scrollTo(0, document.getElementById('creator').getBoundingClientRect().top);
    else{
      if(e.currentTarget.className.indexOf('order-button') === 0 || e.target.className.indexOf('hidden-list-item') === 0){
        this._orderService.makeOrder(this.item, this._currentSize);
        this._orderService.updateOrderCounter();
      }
    }
  }

  openFullDescription(idOpen){
    this._open = idOpen;
  }

  openOnOver(event){
    event.currentTarget.classList.add('open');
    this.hoveredPizza.emit(this.indexPizza);
  }

  openOnOut(event){
    event.currentTarget.classList.remove('open');
    this.outsidePizza.emit(this.indexPizza);
  }

}
