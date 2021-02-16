import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent implements OnInit, OnDestroy {
  // add observable to listen for the changes
  constructor() {
  }

  ngOnInit(): void {
    // this.recipeSelectSub = this._recipeServ.recipeSelected.subscribe(
    //   (recipeData: Recipe) => {
    //     this.selectedRecipe = recipeData
    //   });
  }

  ngOnDestroy() {
    // this.recipeSelectSub.unsubscribe();
  }

}
