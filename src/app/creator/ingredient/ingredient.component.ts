import { Component, OnInit, trigger, state, style, transition, animate, Input  } from '@angular/core';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  animations: [
    trigger('signal', [
      state('go', style({opacity: 0.2})),
      state('stop', style({opacity: 1})),
      transition('* => *',  animate('.5s'))
    ])
  ],
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  signal: string = 'go';

  @Input() left: number;
  @Input() top: number;
  @Input() url: string;

  ngOnInit() {}

  fade(){
    if(this.signal === 'go') this.signal = 'stop'
    else this.signal = 'go';
  }

}
