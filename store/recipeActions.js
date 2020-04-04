import { fetchRecipes } from '../helper/db';

export const GET_RECIPES = 'GET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export const addRecipe = (name, picture, prep, cook, difficulty, steps) => {};
export const deleteRecipe = (recipeId) => {};
export const getRecipes = () => {
  return async (dispatch) => {
    const queryResult = await fetchRecipes();
    console.log(queryResult);
    dispatch({ type: GET_RECIPES, payload: [] });
  };
};
