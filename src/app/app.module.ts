import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app.routing.module';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { ErrorInterceptor } from './auth/error-interceptor';
import { RequestInterceptor } from './auth/request.interceptor';
import { RecipeModule } from './recipe-book/recipe-modules/recipe.module';
import { ShoppingListModule } from './shopping-list/shopping-list-module/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
  ],
  imports: [
    FormsModule,
    RecipeModule,
    BrowserModule,
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
