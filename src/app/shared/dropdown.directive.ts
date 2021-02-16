import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') toggleClick: boolean = false;

  constructor() { }

  @HostListener('click') toggleOpen() {
    this.toggleClick = !this.toggleClick;
  }

}
