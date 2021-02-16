import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipe-book/recipe-list.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipesServ: RecipeService,
    @Inject('API_URL') private API_URL: string) { }

  storeRecipes() {
    return this.http.put(`${this.API_URL}/recipes.json`, this.recipesServ.getRecipes()).subscribe(
      (response) => {
        console.log('Recipes udpated', response)
      }
    )
  }
}
