import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app.routing.module';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { LoadingSpinnerCircularComponent } from './shared/loading-spinner-circular/loading-spinner-circular.component';
import { ErrorInterceptor } from './auth/error-interceptor';
import { RequestInterceptor } from './auth/request.interceptor';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipeModule } from './recipe-book/recipe-modules/recipe.module';
import { ShoppingListModule } from './shopping-list/shopping-list-module/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    DropdownDirective,
    ConfirmationDialogComponent,
    LoadingSpinnerComponent,
    LoadingSpinnerCircularComponent,
    AlertComponent
  ],
  imports: [
    FormsModule,
    RecipeModule,
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    ShoppingListModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: "API_URL",
      useValue: environment.API_URL
    },
    {
      provide: "API_KEY",
      useValue: environment.API_KEY
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
