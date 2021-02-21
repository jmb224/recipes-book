import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-book/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app.routing.module';
import { RecipeHomeComponent } from './recipe-book/recipe-home/recipe-home.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { LoadingSpinnerCircularComponent } from './shared/loading-spinner-circular/loading-spinner-circular.component';
import { ErrorInterceptor } from './auth/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    DropdownDirective,
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeHomeComponent,
    RecipeEditComponent,
    ShoppingListComponent,
    RecipeDetailComponent,
    ShoppingListEditComponent,
    ConfirmationDialogComponent,
    LoadingSpinnerComponent,
    LoadingSpinnerCircularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
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
