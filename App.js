import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Alert } from 'react-native';
import ReduxThunk from 'redux-thunk';
import recipeReducer from './store/recipeReducer';
import MainNavigator from './navigation/MainNavigator';
import { createCategoryTable } from './helper/db';

createCategoryTable()
  .then()
  .catch((err) => Alert.alert('Error!', `${err}. PLEASE contact with us!`, [{ text: 'Okay' }]));

const rootReducer = combineReducers({
  recipes: recipeReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
