import { Component } from '@angular/core';

interface CirclesCoordinates {
  left: number;
  top: number;
};

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent{

  num: number = 20; // Число картинок
  wrap: number = 500; // Размер "холста" для расположения картинок
  radius: number = 200; // Радиус нашего круга
  coordinates: CirclesCoordinates[] = [];

  getArrayPosition(i: number = 0){
    for(i = 0; i < this.num; i++){
      let f = 2 / this.num * i * Math.PI;
      let left = this.wrap + this.radius * Math.sin(f);
      let top = this.wrap + this.radius * Math.cos(f);
      this.coordinates.push({left, top});
      return false;
    }
  };
}
