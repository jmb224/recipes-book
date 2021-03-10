import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[]}>;
  ingredientSub: Subscription;

  constructor(
    private store: Store<{ shoppingList: { ingredients: Ingredient[]}}>,
    private _shoppingListServ: ShoppingListService) { }

  ngOnInit() {
    console.log("New Ingredient Added");
    this.ingredients = this.store.select('shoppingList')
    // this.ingredients = this._shoppingListServ.getAllIngredients();
    // this.ingredientSub = this._shoppingListServ.ingredientsChanged.subscribe(
    //   (_ingredients: Ingredient[]) =>
    //   {
    //     this.ingredients = _ingredients;
    //   }
    // );
  }

  ngOnDestroy()  {
    // this.ingredientSub.unsubscribe();
  }

  newIngredientAdded(ingredient: Ingredient): void {
    // this.ingredients.push(ingredient);
  }

  editItem(id: number) {
    this._shoppingListServ.editingStarted.next(id);
    // console.log(id);
  }

}
