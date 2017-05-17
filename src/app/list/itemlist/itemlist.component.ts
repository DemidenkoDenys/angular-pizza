import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  @Input() sizeItem;
  @Input() idPizza: number;
  @Input() indexFromList: number;
           uniqueIdSize: string;

  @Output() sizeChecked = new EventEmitter();

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
