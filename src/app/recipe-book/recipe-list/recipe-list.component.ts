import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe-list.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // recipes: Recipe[] =
  // [
  //   new Recipe("Recipe 1", "Recipe 1", "../assets/images/img1.jpg"),
  //   new Recipe("Recipe 2", "Recipe 2", "../assets/images/img2.jpg"),
  //   new Recipe("Recipe 3", "Recipe 3", "../assets/images/img3.jpeg")
  // ];
  recipes: Recipe[];
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor(
    private _recipeServ: RecipeService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this._recipeServ.getRecipes();

    this._recipeServ.recipeChanged.subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  onNewRecipe() {
    this._router.navigate(['new'], {relativeTo: this._route})
  }
  // onRecipeSelected(recipeEl: Recipe) {
  //   console.log("RecipeEl", recipeEl)
  //   this.recipeWasSelected.emit(recipeEl);
  // }
}
