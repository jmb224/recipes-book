import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 8),
    new Ingredient('Garlics', 9)
  ];

  // newIngredientAdded = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  editingStarted = new Subject<number>();

  constructor() { }

  getAllIngredients() : Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(id: number) {
    return this.ingredients[id];
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addNewIngredient(ingredient: Ingredient) : void {
    const elFound = this.ingredients.find((e) => {return e.name == ingredient.name});

    if (elFound) {
      elFound.amount += ingredient.amount;
    }
    else
      this.ingredients.push(ingredient);

    // this.newIngredientAdded.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
