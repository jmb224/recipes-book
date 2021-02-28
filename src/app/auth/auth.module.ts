import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

const authRoute: Routes = [
  { path: 'auth', component: AuthComponent}
]

@NgModule({
  declarations: [AuthComponent],
  imports: [RouterModule.forChild(authRoute), CommonModule, ReactiveFormsModule,
    HttpClientModule, SharedModule],
  exports: [RouterModule, AuthComponent]
})

export class AuthModule {}
