import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['../input.component.css']
})
export class AmountComponent implements OnInit{

  public amountModel: string = '';
  public isAmountValid: boolean = false;
  private _amountTip: string = '';
  public amountMask = [/\d/, /\d/, /\d/, /\d/];

  subscription: Subscription;

  @Input() initValue;
  @Output() initValueChange = new EventEmitter();

  constructor(private _orderService: OrderService){
    this.subscription = _orderService.updateCount$.subscribe(
      () => {
        this.checkTip();
        this.validateAmount();
      });
  }

  ngOnInit(){
    this.amountModel = this.initValue;
    this.validateAmount();
    this.checkTip();
  }

  ngOnChanges(){
    if(this.initValue === '**CLEAR**'){
      this.initValue = '';
      this.amountModel = this.initValue;
      this.validateAmount();
      sessionStorage.removeItem('order_amount_value');
      this.checkTip();
    }
  };

  onChangeAmount(){
    sessionStorage.setItem('order_amount_value', this.amountModel);
    this.validateAmount();
    this.initValueChange.emit(this.amountModel);
    this.checkTip();
  }

  validateAmount(){
    this.isAmountValid = /\d+/.test(this.amountModel) && +this.amountModel >= this._orderService.getOrderSum();
  }

  checkTip(){
    this._amountTip = 'Сумма заказа ' + this._orderService.getOrderSum() + ' грн';
  }

}
