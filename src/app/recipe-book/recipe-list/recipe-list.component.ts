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
  recipes: Recipe[];

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
}
