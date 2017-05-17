import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {

  sizes = [];

  private _currentPrice;
  private _currentWeight;
  _orderedSize: number;

  @Input() item;

  constructor(private _getSizesData: GetDataService,
              private _orderService: OrderService){}

  ngOnInit(){
    this._currentPrice = this.item.initPrice;
    this._currentWeight = this.item.initWeight;

    this._getSizesData.getSizesInformation()
                      .then(sizes => { this.sizes = sizes;
                                       this._orderedSize = this.sizes[0].size;
                                     });
  }

  onSizeChecked(event){
     this._currentPrice = Math.round(this.item.initPrice * event.pratio);
     this._currentWeight = Math.round(this.item.initWeight * event.wratio);
     this._orderedSize = event.size;
  }

  onMakeOrder(item){
    this._orderService.makeOrder(item, this._orderedSize);
    this._orderService.updateOrderCounter();
  }

}
