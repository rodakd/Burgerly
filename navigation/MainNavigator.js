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
      name="details"
      component={RecipeDetailsScreen}
    />
    <RecipeStackNavigator.Screen name="settings" component={SettingsScreen} />
    <RecipeStackNavigator.Screen name="edit" component={EditRecipeScreen} />
  </RecipeStackNavigator.Navigator>
);

export default MainNavigator;
