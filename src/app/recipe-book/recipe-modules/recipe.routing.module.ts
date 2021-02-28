import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "src/app/auth/auth.guard";
import { RecipeBookComponent } from "../recipe-book.component";
import { RecipeDetailComponent } from "../recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "../recipe-edit/recipe-edit.component";
import { RecipeHomeComponent } from "../recipe-home/recipe-home.component";
import { RecipeResolver } from "../recipe-resolver/recipe.resolver";

const recipeRoutes: Routes =
[
  {
    path: '',
    component: RecipeBookComponent,
    canActivate: [AuthGuard],
    resolve:{ recipes: RecipeResolver},
    children: [
      { path: '', component: RecipeHomeComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {}
