import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CategoryScreen,
  RecipeDetailsScreen,
  RecipesOverviewScreen,
  SettingsScreen,
  EditRecipeScreen,
} from '../screens';

const RecipeStackNavigator = createStackNavigator();
const MainNavigator = () => (
  <RecipeStackNavigator.Navigator>
    <RecipeStackNavigator.Screen name="categories" component={CategoryScreen} />
    <RecipeStackNavigator.Screen
      name="recipes"
      component={RecipesOverviewScreen}
    />
    <RecipeStackNavigator.Screen
      name="RecipeDetailsScreen"
      component={RecipeDetailsScreen}
    />
    <RecipeStackNavigator.Screen
      name="SettingsScreen"
      component={SettingsScreen}
    />
    <RecipeStackNavigator.Screen
      name="EditRecipeScreen"
      component={EditRecipeScreen}
    />
  </RecipeStackNavigator.Navigator>
);

export default MainNavigator;
