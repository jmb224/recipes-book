import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Recipe } from '../recipe-list.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private _shoppingListServ: ShoppingListService,
    private _recipeServ: RecipeService,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _router: Router) { }

  ngOnInit(): void {

    this._route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this._recipeServ.getRecipe(this.id);
      }
    );
    // console.log(this._route.snapshot.params.id);
  }

  addToShoppingList(): void {
    let self = this;
    this.recipe.ingredients.forEach((el) => {
      this._shoppingListServ.addNewIngredient(el);
    });

    console.log("All Ingredients: ", this._shoppingListServ.ingredients);
  }

  onRecipeEdit() {
    this._router.navigate(['edit'], {relativeTo: this._route});
  }
  deleteRecipe() {

    // add confirmation dailog to determine if we should delete this ingredient or not
    this.openDialog();
    // this._recipeServ.deleteRecipe(this.recipe);
  }

  yes: boolean;
  no: boolean;
  openDialog() {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      minWidth: '400px',
      data: {yes: this.yes, no: this.no}
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('User said: ', data);
      if (data) {
        this._recipeServ.deleteRecipe(this.recipe);
        this._router.navigate(['../'], {relativeTo: this._route});
      }
    });
  }
}
