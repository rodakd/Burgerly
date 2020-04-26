import { SET_RECIPES, ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE } from './recipes/recipesActions';
import {
  SET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
} from './categories/categoriesActions';

const initialStore = {
  categories: [],
  recipes: [],
};

export default (state = initialStore, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };

    case SET_RECIPES:
      return { ...state, recipes: action.payload };

    case ADD_CATEGORY:
      return { ...state, categories: state.categories.concat(action.payload) };

    case ADD_RECIPE:
      return { ...state, recipes: state.recipes.concat(action.payload) };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.payload),
      };

    case DELETE_RECIPE:
      return { ...state, recipes: state.recipes.filter((recipe) => recipe.id !== action.payload) };

    case EDIT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };

    case EDIT_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? action.payload : recipe
        ),
      };

    default:
      return state;
  }
};
