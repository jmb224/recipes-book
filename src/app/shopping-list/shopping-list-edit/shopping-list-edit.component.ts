import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { AddIngredient } from '../shopping-list.actions';
import { ShoppingListReducer } from '../shopping-list.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  formControl: FormGroup;
  shoppSubs: Subscription;
  editMode: boolean = false;
  editedItem: Ingredient;
  editedItemIndex: number;

  constructor(
    private _shoppingListServ: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[]}}>,
    ) { }

  ngOnInit(): void {
    this.createForm();

    this.shoppSubs = this._shoppingListServ.editingStarted.subscribe(
      (id: number) => {
        this.editMode = true;
        this.editedItemIndex = id;
        this.editedItem = this._shoppingListServ.getIngredient(id);

        this.formControl.get('name').setValue(this.editedItem.name);
        this.formControl.get('amount').setValue(this.editedItem.amount);
      }
    );
  }

  ngOnDestroy() {
    this.shoppSubs.unsubscribe();
  }
  createForm() {
    this.formControl = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
    });
  }

  addIngredient(): void {
    let name = this.formControl.get('name').value as string;
    let amount = this.formControl.get('amount').value as number;
    this._shoppingListServ.addNewIngredient(new Ingredient(name, amount));
    this.store.dispatch(new AddIngredient(new Ingredient(name, amount)))
    // this.addNewIngredient.emit(new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value))
  }

  clearInput(): void {
    this.formControl.reset();
    this.editMode = false;
  }

  deleteIngredient() {
    console.log('Item to delete', this.editedItem);
    this._shoppingListServ.deleteIngredient(this.editedItemIndex);
    this.clearInput();;
  }
}
