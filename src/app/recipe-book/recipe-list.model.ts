import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public name: string;
  public image: string;
  public description: string;
  public ingredients?: Ingredient[]

  constructor(name: string, desc: string, img: string, ingredient?: Ingredient[]) {
    this.name = name;
    this.image = img;
    this.description = desc;
    this.ingredients = ingredient
  }
}
