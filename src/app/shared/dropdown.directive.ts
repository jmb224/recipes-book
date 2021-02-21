import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') toggleClick: boolean = false;
  userLoggedIn = false;

  constructor(private authServ: AuthService) {
    authServ.userSubject.subscribe(
      (user) => {
        if (user != null) {
          this.userLoggedIn = true;
        }
      }
    );
   }

  @HostListener('click') toggleOpen() {
    if (this.userLoggedIn) {
      this.toggleClick = !this.toggleClick;
    }
  }

}
