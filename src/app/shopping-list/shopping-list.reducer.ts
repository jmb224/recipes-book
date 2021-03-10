import { Ingredient } from "../shared/ingredient.model";
import { AddIngredient, ADD_INGREDIENT } from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 8),
    new Ingredient('Garlics', 9)
  ]
};

export function ShoppingListReducer (state=initialState, action: AddIngredient) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }

    default:
      return state
  }
}
