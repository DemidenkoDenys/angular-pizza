import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[cancelSelect]'
})
export class CancelSelectDirective {
  @HostListener('selectstart') onSelectStart() { console.log(); return false; }
}
