import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Alert, StatusBar } from 'react-native';
import ReduxThunk from 'redux-thunk';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import reducer from './store/reducer';
import MainNavigator from './navigation/MainNavigator';
import { createCategoryTable, createRecipeTable } from './helper/db';
import Colors from './constants/Colors';

const init = async () => {
  try {
    await createCategoryTable();
    await createRecipeTable();
  } catch (err) {
    Alert.alert('Error!', `${err}. PLEASE contact with us!`, [{ text: 'Okay' }]);
  }
};

init();

const fetchFonts = async () =>
  Font.loadAsync({
    'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
    'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
  });

const rootReducer = combineReducers({
  root: reducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setIsReady(true)} />;
  }

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={Colors.background} />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
