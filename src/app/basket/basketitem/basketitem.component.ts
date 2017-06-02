import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { GetDataService, FullOrderList } from '../../services/get-data.service';

@Component({
  selector: 'app-basketitem',
  templateUrl: './basketitem.component.html',
  styleUrls: ['./basketitem.component.css']
})
export class BasketitemComponent{

  @Input()  item: FullOrderList;
  @Output() deleteItemEvent = new EventEmitter();

  constructor(private _orderService: OrderService,
              private _getDataService: GetDataService){}

  deleteItem(item){
    this._orderService.deleteOrderItem(item);
    this._orderService.updateBasket();
    this.deleteItemEvent.emit(item);
  }

}
