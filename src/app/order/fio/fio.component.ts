import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fio',
  templateUrl: './fio.component.html',
  styleUrls: ['../input.component.css']
})
export class FioComponent implements OnInit{

    public fioModel: string = '';
    public isFioValid: boolean = false;
    public fioTip:string = '';

    @Input() initValue;
    @Output() initValueChange = new EventEmitter();

  constructor(){}

  ngOnInit(){
    this.fioModel = this.initValue;
    this.validateFio();
  }

  ngOnChanges(){
    if(this.initValue === '**CLEAR**'){
      this.initValue = '';
      this.fioModel = this.initValue;
      this.validateFio();
      this.checkTip();
      sessionStorage.removeItem('order_fio_value');
    }
  }

  onChangeFio(){
    sessionStorage.setItem('order_fio_value', this.fioModel);
    this.firstLetterToUp();
    this.checkTip();
    this.initValueChange.emit(this.fioModel);
    this.validateFio();
  }

  firstLetterToUp(){
    let tempArray = this.fioModel.split(' ');
    for(let i = 0, l = tempArray.length; i < l && tempArray[i].length > 1; i++)
      tempArray[i] = tempArray[i].charAt(0).toUpperCase() + tempArray[i].substr(1).toLowerCase();
    this.fioModel = tempArray.join(' ');
  }

  checkTip(){
    this.fioTip = '';

    if(this.fioModel.length > 0 && !/^[А-Яа-яЁё\s]+$/.test(this.fioModel))
      this.fioTip = 'В поле не должно быть';
    if(/\d/g.test(this.fioModel))
      this.fioTip += ' цифр';
    if(/[A-Za-z]/g.test(this.fioModel))
      this.fioTip += ' англ. букв';
  }

  validateFio(){
    return this.isFioValid = /^[А-Яа-яЁё]+\s[А-Яа-яЁё]+\s[А-Яа-яЁё]+$/.test(this.fioModel);
  }

}
