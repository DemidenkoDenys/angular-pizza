import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { GetDataService } from '../../services/get-data.service';

@Component({
  selector: 'app-basketitem',
  templateUrl: './basketitem.component.html',
  styleUrls: ['./basketitem.component.css']
})
export class BasketitemComponent implements OnInit {

  toggleBasketItem = false;
  private sizes;
  @Input() item;
  @Output() deleteItemEvent = new EventEmitter();

  constructor(private _orderService: OrderService,
              private _getDataService: GetDataService){}

  ngOnInit(){
    this.sizes = this._getDataService.getSizesInformation();
  }

  deleteItem(e, item){
    this._orderService.deleteOrderItem(item);
    this._orderService.updateBasket();
    this.deleteItemEvent.emit(item);
  }

}
