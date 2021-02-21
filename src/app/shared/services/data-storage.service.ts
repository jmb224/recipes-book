import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipe-book/recipe-list.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { exhaustMap, map, take, tap} from "rxjs/operators"
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private userSub: Subscription;
  private token;

  constructor(
    private http: HttpClient,
    private authServ: AuthService,
    private recipesServ: RecipeService,
    @Inject('API_URL') private API_URL: string) {

      this.userSub = this.authServ.userSubject.subscribe(user => {
        if (user) {
          this.token = user.token
        }
      })
    }

  storeRecipes() {
    return this.http.put(`${this.API_URL}/recipes.json`, this.recipesServ.getRecipes(), {

    }).subscribe(
      (response) => {
        console.log('Recipes udpated', response)
      }
    )
  }

  fetchRecipes() {
    // return this.authServ.userSubject.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     user = user || JSON.parse(localStorage.getItem('userData')) as User
    //     return this.http.get<Recipe[]>(`${this.API_URL}/recipes.json?auth=${user.token}`)
    //   }),
    //   tap((recipes) => {
    //     this.recipesServ.recipesInit(recipes)
    //   })
    // );
    return this.http.get<Recipe[]>(`${this.API_URL}/recipes.json`).pipe(
      tap((recipes) => {
        this.recipesServ.recipesInit(recipes)
      })
    )
  }
}
