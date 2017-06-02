import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['../input.component.css']
})
export class PhoneComponent implements OnInit{

  private _isPhoneValid = false;
  public phoneModel = '';
  public phoneMask = ['(', '0', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  @Input() initValue;
  @Output() initValueChange = new EventEmitter();

  constructor(){}

  ngOnInit(){
    this.phoneModel = this.initValue;
    this.validatePhone();
  }

  ngOnChanges(){
    if(this.initValue === '**CLEAR**'){
      this.initValue = '';
      this.phoneModel = this.initValue;
      this.validatePhone();
      sessionStorage.removeItem('order_phone_value');
    }
  }

  onChangePhone(){
    sessionStorage.setItem('order_phone_value', this.phoneModel);
    this.initValueChange.emit(this.phoneModel);
    this.validatePhone();
  }

  validatePhone(){
    this._isPhoneValid = /[(]0\d\d[)]\s\d\d\d[-]\d\d\d\d/.test(this.phoneModel);
  }


}
