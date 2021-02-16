import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Recipe } from '../recipe-book/recipe-list.model';
import { Ingredient } from '../shared/ingredient.model';
import { DataStorageService } from '../shared/services/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = []
  recipeChanged = new Subject<Recipe[]>();

  constructor() { }

  getRecipes() : Recipe[] {
    return this.recipes.slice(); // this will return the exact copy of the array and therefore not linked by reference anymore
  }

  getRecipe(id: number) : Recipe {
    return this.recipes[id];
  }

  recipesInit(recipes: Recipe[]) {
    this.recipes = recipes

    this.recipeChanged.next(recipes.slice())
  }

  // onRecipeSelected(data: Recipe) {
  //   // this.recipeSelected.emit(data);
  //   this.recipeSelected.next(data);
  // }

  deleteRecipe(recipe: Recipe) {
    const index = this.recipes.indexOf(recipe);

    console.log('delete recipe');
    if (index !== -1) {
      this.recipes.splice(index, 1);
      this.recipeChanged.next(this.getRecipes());
    }
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.getRecipes())
  }

  updateRecipe(recipe: Recipe, id: number) {

    if (id !== -1) {
      this.recipes[id] = recipe;
      this.recipeChanged.next(this.getRecipes())
    }
  }
}
