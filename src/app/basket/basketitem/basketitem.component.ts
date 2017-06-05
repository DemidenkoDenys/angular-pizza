import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { GetDataService } from '../../services/get-data.service';
import { FullOrderList } from '../../services/order.interface';

@Component({
  selector: 'app-basketitem',
  templateUrl: './basketitem.component.html',
  styleUrls: ['./basketitem.component.css']
})
export class BasketitemComponent implements OnInit{

  formattedDate;

  @Input()  item: FullOrderList;
  @Output() deleteItemEvent = new EventEmitter();

  constructor(private _orderService: OrderService,
              private _getDataService: GetDataService){}

  ngOnInit(){
    this.formattedDate = new Date(this.item.date).toLocaleString("ru", {
                                                                          year: 'numeric',
                                                                          month: 'long',
                                                                          day: 'numeric',
                                                                          weekday: 'long',
                                                                          hour: 'numeric',
                                                                          minute: 'numeric',
                                                                          second: 'numeric'
                                                                        });

  }

  deleteItem(item){
    this._orderService.deleteOrderItem(item);
    this._orderService.updateBasket();
    this.deleteItemEvent.emit(item);
  }

}
