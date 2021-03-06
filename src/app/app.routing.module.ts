import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes =
[
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes',
    loadChildren: async () => import('./recipe-book/recipe-modules/recipe.module').then(m => m.RecipeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
