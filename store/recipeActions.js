import { Alert } from 'react-native';
import { insertCategory, fetchCategories, deleteCategory, updateCategory } from '../helper/db';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';

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
    insertCategory({ title, color })
      .then()
      .catch((err) => {
        Alert.alert(err, 'Please try again', [{ text: 'Okay' }]);
      });
    dispatch({ type: ADD_CATEGORY, payload: { title, color } });
  };
};

export const editCategory = (id, title, color) => {
  return async (dispatch) => {
    updateCategory({ id, title, color })
      .then()
      .catch((err) => {
        Alert.alert(err, 'Please try again', { text: 'Okay' });
      });
    dispatch({ type: EDIT_CATEGORY, payload: { id, title, color } });
  };
};

export const trashCategory = (id) => {
  return async (dispatch) => {
    deleteCategory(id)
      .then()
      .catch((err) => {
        Alert.alert(err, 'Please try again', { text: 'Okay' });
      });
    dispatch({ type: DELETE_CATEGORY, payload: id });
  };
};

export const addRecipe = () => {};
