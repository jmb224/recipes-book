import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipe-book/recipe-list.model';

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
