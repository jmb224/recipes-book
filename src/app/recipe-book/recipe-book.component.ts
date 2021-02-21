import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from './recipe-list.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent implements OnInit, OnDestroy {
  // add observable to listen for the changes
  constructor(
    private recipeServ: RecipeService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data: {recipes: Recipe[]}) => {
        this.recipeServ.recipesInit(data.recipes)
      }
    )
    // this.recipeSelectSub = this._recipeServ.recipeSelected.subscribe(
    //   (recipeData: Recipe) => {
    //     this.selectedRecipe = recipeData
    //   });
  }

  ngOnDestroy() {
    // this.recipeSelectSub.unsubscribe();
  }

}
