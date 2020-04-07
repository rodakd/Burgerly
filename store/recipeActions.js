import Category from '../models/Category';
import { insertCategory, fetchCategories } from '../helper/db';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';

export const setCategories = () => {
  return async (dispatch) => {
    const dbResult = await fetchCategories();
    dispatch({
      type: SET_CATEGORIES,
      payload: dbResult.rows._array,
    });
  };
};

export const addCategory = (title, color) => {
  return async (dispatch) => {
    const category = new Category(title, color);
    console.log(color);
    console.log(category.color);
    const dbResult = await insertCategory(category);
    console.log(dbResult);
    dispatch({ type: ADD_CATEGORY, payload: category });
  };
};
