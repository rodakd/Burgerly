// TODO Extract to categoriesActions
// TODO Fix the generated id

import { Alert } from 'react-native';
import {
  insertCategory,
  insertRecipe,
  fetchCategories,
  fetchRecipes,
  deleteCategory,
  deleteRecipe,
  updateCategory,
  updateRecipe,
} from '../helper/db';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_RECIPES = 'SET_RECIPES';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_RECIPE = 'ADD_RECIPE';

export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const EDIT_RECIPE = 'EDIT_RECIPE';

export const setCategories = () => {
  return async (dispatch) => {
    fetchCategories()
      .then((dbResult) =>
        dispatch({
          type: SET_CATEGORIES,
          payload: dbResult.rows._array,
        })
      )
      .catch((err) => {
        Alert.alert(err.message, 'Please try again', { text: 'Okay' });
      });
  };
};

export const setRecipes = () => {
  return async (dispatch) => {
    fetchRecipes()
      .then((dbResult) =>
        dispatch({
          type: SET_RECIPES,
          payload: dbResult.rows._array,
        })
      )
      .catch((err) => {
        Alert.alert(err.message, 'Please try again', { text: 'Okay' });
      });
  };
};

export const addCategory = (title, color) => {
  const category = { id: new Date().getTime(), title, color };

  return async (dispatch) => {
    insertCategory(category)
      .then()
      .catch((err) => {
        Alert.alert(err.message, 'Please try again', [{ text: 'Okay' }]);
      });
    dispatch({ type: ADD_CATEGORY, payload: category });
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

export const editCategory = (id, title, color) => {
  const category = { id, title, color };

  return async () => {
    updateCategory(category)
      .then()
      .catch((err) => {
        Alert.alert(err.message, 'Please try again', { text: 'Okay' });
      });
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

export const trashCategory = (id) => {
  return async (dispatch) => {
    deleteCategory(id)
      .then()
      .catch((err) => {
        Alert.alert(err.message, 'Please try again', { text: 'Okay' });
      });
    dispatch({ type: DELETE_CATEGORY, payload: id });
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
