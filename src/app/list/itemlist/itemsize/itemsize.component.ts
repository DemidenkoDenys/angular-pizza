import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';

@Component({
  selector: 'app-itemsize',
  templateUrl: './itemsize.component.html',
  styleUrls: ['./itemsize.component.css']
})
export class ItemsizeComponent implements OnInit {

  sizes = [];
  uniqueIdSize: number;
  selectedSize: number = 0;

  @Output() sizeCheckedEvent = new EventEmitter();

  constructor(private _getDataService: GetDataService){}

  ngOnInit(){
    this.uniqueIdSize = this._getDataService.getUniqueId();
    this.sizes = this._getDataService.getSizesInformation();
    this.checkSize(0);
  }

  checkSize(index){
    this.selectedSize = index;
    this.sizeCheckedEvent.emit(this.sizes[this.selectedSize]);
  }
}
