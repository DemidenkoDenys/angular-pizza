import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['../input.component.css']
})
export class AddressComponent implements OnInit{

  private _cities: string[];
  private _citiesFiltered: string[];
  private _isDatalistActive: boolean = false;
  private isAddressValid: boolean = false;

  public addressModel: string = '';

  @Input() initValue: string;
  @Output() initValueChange = new EventEmitter();

  constructor(private _getDataService: GetDataService){
    this._citiesFiltered = this._cities = _getDataService.getCities();
  }

  ngOnInit(){
    this.addressModel = this.initValue;
    this.validateAddress();
  }

  ngOnChanges(){
    if(this.initValue === '**CLEAR**'){
      this.initValue = '';
      this.addressModel = this.initValue;
      sessionStorage.removeItem('order_address_value');
      this.validateAddress();
    }
  }

  onAddressChange(){
    this._citiesFiltered = this._cities.filter(
      function(value){ return value.toLowerCase().indexOf(this.addressModel.toLowerCase()) + 1 }.bind(this)
    );
    this._isDatalistActive = !(this._citiesFiltered.length === 0);
    sessionStorage.setItem('order_address_value', this.addressModel);
    this.initValueChange.emit(this.addressModel);
    this.validateAddress();
  }

  checkCity(city){
    this._citiesFiltered = this._cities;
    this.addressModel = city;
    this._isDatalistActive = false;
    sessionStorage.setItem('order_address_value', this.addressModel);
    this.initValueChange.emit(this.addressModel);
    this.validateAddress();
  }

  openCheckList(){
    this._isDatalistActive = !(this._citiesFiltered.length === 0);
  }

  hideCheckList(){
    this._isDatalistActive = false;
  }

  validateAddress(){
    this.isAddressValid = this.addressModel.length > 0;
  }

}
