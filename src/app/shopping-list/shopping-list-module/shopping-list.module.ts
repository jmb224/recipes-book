import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from '../shopping-list.component';
import { ShoppingListEditComponent } from '../shopping-list-edit/shopping-list-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule } from './shopping-list.routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [RouterModule, ShoppingRoutingModule, CommonModule, ReactiveFormsModule],

})
export class ShoppingListModule { }
