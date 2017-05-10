import { Component } from '@angular/core';

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  title: string = 'Dream Pizza';
  public logoImage = require('../img/logo.png');

}
