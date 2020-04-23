import {
  SET_CATEGORIES,
  SET_RECIPES,
  ADD_CATEGORY,
  ADD_RECIPE,
  DELETE_CATEGORY,
  DELETE_RECIPE,
  EDIT_RECIPE,
} from './recipeActions';

const initialStore = {
  categories: [],
  recipes: [],
};

export default (state = initialStore, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ADD_CATEGORY: {
      const newCategories = state.categories;
      newCategories.push(action.payload);
      return { ...state, categories: newCategories };
    }
    case DELETE_CATEGORY: {
      const newCategories = state.categories.filter((category) => category.id !== action.payload);
      return { ...state, categories: newCategories };
    }
    case SET_RECIPES:
      return { ...state, recipes: action.payload };
    case ADD_RECIPE: {
      const newRecipes = state.recipes;
      newRecipes.push(action.payload);
      return { ...state, recipes: newRecipes };
    }
    case EDIT_RECIPE: {
      const index = state.recipes.findIndex((recipe) => recipe.id === action.payload.id);
      const newRecipes = state.recipes;
      newRecipes[index] = action.payload;
      return { ...state, recipes: newRecipes };
    }
    case DELETE_RECIPE: {
      const newRecipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
      return { ...state, recipes: newRecipes };
    }
    default:
      return state;
  }
};
