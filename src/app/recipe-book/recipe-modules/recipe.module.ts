import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { RecipeBookComponent } from "../recipe-book.component";
import { RecipeDetailComponent } from "../recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "../recipe-edit/recipe-edit.component";
import { RecipeHomeComponent } from "../recipe-home/recipe-home.component";
import { RecipeItemComponent } from "../recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "../recipe-list/recipe-list.component";

import { RecipeRoutingModule } from "./recipe.routing.module";

var components = [
  RecipeBookComponent,
  RecipeListComponent,
  RecipeItemComponent,
  RecipeHomeComponent,
  RecipeEditComponent,
  RecipeDetailComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [RecipeRoutingModule, SharedModule, ReactiveFormsModule],
  exports: [],
})

export class RecipeModule{}
