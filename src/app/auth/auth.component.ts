import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService, UserLogin } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})

export class AuthComponent {
  public isLogingMode = true;
  public isLoading = false;
  public authFormGroup: FormGroup;

  constructor(private authServ: AuthService) {
    this.initForm();
  }

  onSwitchMode() {
    this.isLogingMode = !this.isLogingMode
  }

  initForm() {
    this.authFormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onLoginOrSignup() {
    const user: UserLogin = this.authFormGroup.value
    user.returnSecureToken = true

    var handleResponse = (data) => {
      console.log('Sign up successfull', data)

      setTimeout(() => { this.isLoading = false; }, 2000)
    }

    var handleError = (error) => {
      console.log('Something went wrong', error);
    }

    this.isLoading = true;

    if (this.isLogingMode) {
      this.authServ.signin(user).subscribe(
        (data) => handleResponse(data),
        (error) => handleError(error)
      );
    }
    else {
      this.authServ.signup(user).subscribe(
        (data) => handleResponse(data),
        (error) => handleError(error)
      );
    }
  }
}
