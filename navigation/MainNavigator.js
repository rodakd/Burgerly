import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  RecipeDetailsScreen,
  RecipeScreen,
  SettingsScreen,
  EditRecipeScreen,
  DragListScreen,
} from '../screens';
import CategoryScreen from '../screens/CategoryScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.secondary,
  headerTitleStyle: {
    fontFamily: 'lato-bold',
  },
};

const RecipeStackNavigator = createStackNavigator();
const MainNavigator = () => (
  <RecipeStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <RecipeStackNavigator.Screen name="categories" component={CategoryScreen} />
    <RecipeStackNavigator.Screen name="recipes" component={RecipeScreen} />
    <RecipeStackNavigator.Screen name="details" component={RecipeDetailsScreen} />
    <RecipeStackNavigator.Screen name="settings" component={SettingsScreen} />
    <RecipeStackNavigator.Screen name="edit" component={EditRecipeScreen} />
    <RecipeStackNavigator.Screen name="dragList" component={DragListScreen} />
  </RecipeStackNavigator.Navigator>
);

export default MainNavigator;
