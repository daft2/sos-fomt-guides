export type { Recipe } from './types';

import recipes001to030 from './recipes-001-030';
import recipes031to060 from './recipes-031-060';
import recipes061to090 from './recipes-061-090';
import recipes091to120 from './recipes-091-120';

export const recipes = [
  ...recipes001to030,
  ...recipes031to060,
  ...recipes061to090,
  ...recipes091to120,
];

export function getRecipeById(id: number) {
  return recipes.find((r) => r.id === id);
}

export function getRecipesByUtensil(utensil: string) {
  return recipes.filter((r) => r.utensils.includes(utensil));
}

export function getRecipesByIngredient(ingredient: string) {
  return recipes.filter((r) =>
    r.ingredients.some((i) => i.toLowerCase().includes(ingredient.toLowerCase()))
  );
}

export {
  recipes001to030,
  recipes031to060,
  recipes061to090,
  recipes091to120,
};
