import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataStorageService } from '../shared/services/data-storage.service';
import { Recipe } from './recipe-list.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe[]> {

  constructor(
    private dataStorageServ: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> {
    return this.dataStorageServ.fetchRecipes()
  }
}
