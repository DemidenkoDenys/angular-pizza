import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-itemsize',
  templateUrl: './itemsize.component.html',
  styleUrls: ['./itemsize.component.css']
})
export class ItemsizeComponent implements OnInit {

  @Input() sizeItem;
  @Input() idPizza: number;
  @Input() indexFromList: number;
           uniqueIdSize: string;

  @Output() sizeChecked = new EventEmitter();

  constructor(){}

  ngOnInit(){
    this.uniqueIdSize = this.idPizza + '_' + this.sizeItem.size;
  }

  checkSize(){
    this.sizeChecked.emit({ wratio: this.sizeItem.weightRatio,
                            pratio: this.sizeItem.priceRatio,
                            size:   this.sizeItem.size,
                            idPizza:this.idPizza });
  }
}
