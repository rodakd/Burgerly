import { SET_CATEGORIES, ADD_CATEGORY, DELETE_CATEGORY } from './recipeActions';

const initialStore = {
  categories: [],
};

export default (state = initialStore, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ADD_CATEGORY:
      return { ...state, categories: state.categories.push(action.payload) };
    case DELETE_CATEGORY: {
      const newCategories = state.categories.filter((category) => category.id !== action.payload);
      return { ...state, categories: newCategories };
    }
    default:
      return state;
  }
};
