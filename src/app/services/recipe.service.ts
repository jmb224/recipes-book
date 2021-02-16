import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Recipe } from '../recipe-book/recipe-list.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] =
  [
    new Recipe("Recipe 1", "Recipe 1", "../assets/images/img1.jpg",
    [new Ingredient("Meat", 1), new Ingredient("Fries", 3), new Ingredient("Chilli", 5)]),
    new Recipe("Recipe 2", "Recipe 2", "../assets/images/img2.jpg",
    [new Ingredient("Bread", 1), new Ingredient("Garlic", 5)]),
    new Recipe("Recipe 3", "Recipe 3", "../assets/images/img3.jpeg",
    [new Ingredient("Espinach", 2), new Ingredient("Salt", 1)])
  ];

  recipeChanged = new Subject<Recipe[]>();

  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();
  constructor() { }

  getRecipes() : Recipe[] {
    return this.recipes.slice(); // this will return the exact copy of the array and therefore not linked by reference anymore
  }

  getRecipe(id: number) : Recipe {
    return this.recipes[id];
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
