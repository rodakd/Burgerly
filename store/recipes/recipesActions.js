import { Alert } from 'react-native';
import { insertRecipe, fetchRecipes, deleteRecipe, updateRecipe } from '../../helper/db';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const EDIT_RECIPE = 'EDIT_RECIPE';

export const setRecipes = (categoryId) => {
  return async (dispatch) => {
    fetchRecipes(categoryId)
      .then((dbResult) =>
        dispatch({
          type: SET_RECIPES,
          payload: dbResult.rows._array,
        })
      )
      .catch((err) => {
        Alert.alert(err.message, 'Please try again', [{ text: 'Okay' }]);
      });
  };
};

export const addRecipe = (
  categoryId,
  title,
  image,
  duration,
  difficulty,
  calories,
  ingredients,
  steps
) => {
  const recipe = {
    id: new Date().getTime(),
    categoryId,
    title,
    image,
    duration,
    difficulty,
    calories,
    ingredients,
    steps,
  };
  return async (dispatch) => {
    insertRecipe(recipe)
      .then()
      .catch((err) => {
        Alert.alert(err.message, 'Please try again', [{ text: 'Okay' }]);
      });
    dispatch({ type: ADD_RECIPE, payload: recipe });
  };
};

export const editRecipe = (
  id,
  title,
  image,
  duration,
  difficulty,
  calories,
  ingredients,
  steps
) => {
  const recipe = {
    id,
    title,
    image,
    duration,
    difficulty,
    calories,
    ingredients,
    steps,
  };

  return async (dispatch) => {
    updateRecipe(recipe)
      .then()
      .catch((err) => {
        Alert.alert(err.message, 'Please try again', { text: 'Okay' });
      });
    dispatch({ type: EDIT_RECIPE, payload: recipe });
  };
};

export const trashRecipe = (id) => {
  return async (dispatch) => {
    deleteRecipe(id)
      .then()
      .catch((err) => {
        Alert.alert(err.message, 'Please try again', { text: 'Okay' });
      });
    dispatch({ type: DELETE_RECIPE, payload: id });
  };
};
