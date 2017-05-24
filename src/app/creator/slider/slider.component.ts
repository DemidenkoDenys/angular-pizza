import { Component, Input, ElementRef, AfterViewInit, AfterContentInit} from '@angular/core';
import "jquery";
require('slick-carousel');

@Component({
    selector: 'slider',
    template: `
        <ng-content></ng-content>
    `
})
export class SliderComponent implements AfterContentInit{
    @Input() options: any;

    $element: any;

    defaultOptions: any = {};

    constructor(private el: ElementRef){}

    ngAfterContentInit() {
        for (var key in this.options)
            this.defaultOptions[key] = this.options[key];

        // this.$element = $(this.el.nativeElement).slick({});
    }
}
