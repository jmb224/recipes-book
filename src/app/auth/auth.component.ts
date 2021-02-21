import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponse, AuthService, UserLogin } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent {
  public isLogingMode = true;
  public isLoading = false;
  public errorMessage;
  public authFormGroup: FormGroup;
  public authObservale: Observable<AuthResponse>;

  constructor(private route: Router, private authServ: AuthService) {
    this.initForm();
  }

  onSwitchMode() {
    this.isLogingMode = !this.isLogingMode;
  }

  initForm() {
    this.authFormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onLoginOrSignup() {
    const user: UserLogin = this.authFormGroup.value;
    user.returnSecureToken = true

    var handleSuccess = (data: AuthResponse) => {
      setTimeout(() => { this.isLoading = false; }, 2000);

      this.route.navigate(['/recipes']);
    }

    var handleError = (error) => {
      console.log('Something went wrong', error);
      this.errorMessage = error.error.message || error.error.message;
      setTimeout(() => { this.isLoading = false; }, 2000);
    }

    this.isLoading = true;

    if (this.isLogingMode) {
      this.authObservale = this.authServ.signin(user)
    }
    else {
      this.authObservale = this.authServ.signup(user)
    }

    this.authObservale.subscribe(
      (data) => handleSuccess(data),
      (error) => handleError(error)
    );
  }
}
