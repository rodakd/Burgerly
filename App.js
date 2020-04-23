import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Alert } from 'react-native';
import ReduxThunk from 'redux-thunk';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import recipeReducer from './store/recipeReducer';
import MainNavigator from './navigation/MainNavigator';
import {
  fetchAllRecipes,
  createCategoryTable,
  createRecipeTable,
  enableConstraints,
} from './helper/db';

const init = async () => {
  try {
    await enableConstraints();
    await createCategoryTable();
    await createRecipeTable();
  } catch (err) {
    Alert.alert('Error!', `${err}. PLEASE contact with us!`, [{ text: 'Okay' }]);
  }
};

init();

const fetchFonts = async () =>
  Font.loadAsync({
    'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'raleway-semibold': require('./assets/fonts/Raleway-SemiBold.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
    'source-regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    'source-bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
    'gotu-regular': require('./assets/fonts/Gotu-Regular.ttf'),
  });

const rootReducer = combineReducers({
  recipes: recipeReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const fetch = async () => {
    const dataResult = await fetchAllRecipes();
    console.log(dataResult.rows._array);
  };
  fetch();
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setIsReady(true)} />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
