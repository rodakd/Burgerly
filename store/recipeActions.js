import { Alert } from 'react-native';
import Category from '../models/Category';
import { insertCategory, fetchCategories } from '../helper/db';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';

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
        Alert.alert(err, 'Please try again', { text: 'Okay' });
      });
  };
};

export const addCategory = (title, color) => {
  return async (dispatch) => {
    const category = new Category(title, color);
    insertCategory(category)
      .then()
      .catch((err) => {
        Alert.alert(err, 'Please try again', { text: 'Okay' });
      });
    dispatch({ type: ADD_CATEGORY, payload: category });
  };
};

export const addRecipe = () => {};
