import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe-list.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  editForm: FormGroup;
  image: FormControl;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _recipeServ: RecipeService) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      (params: Params) => {
        if (params.id) {
          this.id = +params.id;
          this.editMode = true;

          // console.log(this._recipeServ.getRecipe(this.id));
        }
      }
    );

    this.createForm();
  }

  createForm() {
    let recipe: Recipe;
    let recipeIngredients = new FormArray([])


    if (this.editMode) {
      recipe = this._recipeServ.getRecipe(this.id);
      this.image = new FormControl(recipe?.image, Validators.required);
    }

    if (recipe?.ingredients) {
      for (let ingredient of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount,
              [
                Validators.required,
                Validators.pattern(/[1-9]+[0-9]*$/)
              ])
          })
        )
      }
    }

    this.editForm = new FormGroup({
      name: new FormControl(recipe?.name, [Validators.required]),
      imageURL: this.image ?? new FormControl(null, [Validators.required]),
      description: new FormControl(recipe?.description, [Validators.required]),
      ingredients: recipeIngredients
    });

    console.log(this.editForm)
  }

  getControls() {
    return (<FormArray>this.editForm.get('ingredients')).controls
  }

  addForm() {
    let control = (<FormArray>this.editForm.get('ingredients'));

    control.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/[1-9]+[0-9]*$/)])
    }));
  }

  deleteIngredient(index: number) {
    this.getControls().splice(index, 1);
  }

  save() {
    console.log(this.editForm);

    let recipe = new Recipe(
      this.editForm.value['name'],
      this.editForm.value['description'],
      this.editForm.value['imageURL'],
      this.editForm.value['ingredients'],
    )

    if (this.editMode) {
      this._recipeServ.updateRecipe(recipe, this.id)
    }
    else {
      this._recipeServ.addRecipe(recipe)
      this.editForm.reset()
      let control = (<FormArray>this.editForm.get('ingredients'))

      control.clear()
    }

    this._router.navigate(['../'], {relativeTo: this._route})
  }
}
