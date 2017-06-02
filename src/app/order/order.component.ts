import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  private _isFormValid: boolean = false;

  _initFio: string = '';
  _initAddress: string = '';
  _initPhone: string = '';
  _initAmount: string = '';

  constructor(private _orderService: OrderService){}

  ngOnInit(){
    this._initFio = (sessionStorage.getItem('order_fio_value')) ? sessionStorage.getItem('order_fio_value') : '';
    this._initAddress = (sessionStorage.getItem('order_address_value')) ? sessionStorage.getItem('order_address_value') : '';
    this._initPhone = (sessionStorage.getItem('order_phone_value')) ? sessionStorage.getItem('order_phone_value') : '';
    this._initAmount = (sessionStorage.getItem('order_amount_value')) ? sessionStorage.getItem('order_amount_value') : '';
  }

  ngDoCheck(){
    this.validateForm();
  }

  validateFio(){
    return /^[А-Яа-яЁё]+\s[А-Яа-яЁё]+\s[А-Яа-яЁё]+$/.test(this._initFio);
  }

  validateAddress(){
    return this._initAddress.length > 0;
  }

  validatePhone(){
    return /[(]0\d\d[)]\s\d\d\d[-]\d\d\d\d/.test(this._initPhone);
  }

  validateAmount(){
    return /\d+/.test(this._initAmount) && +this._initAmount >= this._orderService.getOrderSum();
  }

  validateForm(){
    this._isFormValid = this.validateAmount() && this.validateFio() && this.validatePhone() && this.validateAddress();
  }

  clearAllFields(e){
    e.preventDefault();

    this._initFio = '**CLEAR**';
    this._initAddress = '**CLEAR**';
    this._initPhone = '**CLEAR**';
    this._initAmount = '**CLEAR**';

    setTimeout(() => { this._initFio = '' }, 100);
    setTimeout(() => { this._initAddress = '' }, 100);
    setTimeout(() => { this._initPhone = '' }, 100);
    setTimeout(() => { this._initAmount = '' }, 100);
  }

  makeOrder(e){
    if(this._orderService.getOrderCount() === 0)
      alert('Выберите хотя бы одну пиццу');
    else{
      this.clearAllFields(e);
      this._orderService.clearOrder();
      alert('Спасибо за заказ');
    }
  }

}
