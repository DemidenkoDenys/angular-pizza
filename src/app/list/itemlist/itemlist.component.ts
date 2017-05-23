import { Component, OnInit, Input } from '@angular/core';
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

  @Input() item;

  constructor(private _orderService: OrderService){}

  ngOnInit(){}

  onSizeChecked(event){
    this._currentSize = event;
    this._currentPrice = Math.round(this.item.initPrice * event.priceRatio);
    this._currentWeight = Math.round(this.item.initWeight * event.weightRatio);
  }

  onMakeOrder(item){
    if(!item.id)
      window.scrollTo(0, document.getElementById('creator').getBoundingClientRect().top);
    else{
      this._orderService.makeOrder(this.item, this._currentSize);
      this._orderService.updateOrderCounter();
    }
  }

}
