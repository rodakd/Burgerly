import { SET_CATEGORIES, ADD_CATEGORY } from './recipeActions';

const initialStore = {
  categories: [],
};

export default (state = initialStore, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ADD_CATEGORY:
      console.log('category added');
      return { ...state, categories: state.categories.push(action.payload) };
    default:
      return state;
  }
};
