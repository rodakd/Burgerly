import {
  SET_CATEGORIES,
  SET_RECIPES,
  ADD_CATEGORY,
  ADD_RECIPE,
  DELETE_CATEGORY,
  DELETE_RECIPE,
} from './recipeActions';

const initialStore = {
  categories: [],
  recipes: [],
};

export default (state = initialStore, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ADD_CATEGORY:
      state.categories.push(action.payload);
      return { state };
    case DELETE_CATEGORY: {
      const newCategories = state.categories.filter((category) => category.id !== action.payload);
      return { ...state, categories: newCategories };
    }
    case SET_RECIPES:
      return { ...state, recipes: action.payload };
    case ADD_RECIPE: {
      const newRecipes = state.recipes.concat(action.payload);
      return { ...state, recipes: newRecipes };
    }
    case DELETE_RECIPE: {
      const newRecipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
      return { ...state, categories: newRecipes };
    }
    default:
      return state;
  }
};
