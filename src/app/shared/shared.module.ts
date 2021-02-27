import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { AlertComponent } from "./alert/alert.component";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerCircularComponent } from "./loading-spinner-circular/loading-spinner-circular.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    ConfirmationDialogComponent,
    LoadingSpinnerCircularComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    AlertComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    ConfirmationDialogComponent,
    LoadingSpinnerCircularComponent,
  ]
})

export class SharedModule {}
