import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  RecipeDetailsScreen,
  RecipesOverviewScreen,
  SettingsScreen,
  EditRecipeScreen,
} from '../screens';
import CategoryScreen, { categoryScreenOptions } from '../screens/CategoryScreen';
import Colors from '../constants/Colors';
import { recipesScreenOptions } from '../screens/RecipesOverviewScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.secondary,
};

const RecipeStackNavigator = createStackNavigator();
const MainNavigator = () => (
  <RecipeStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <RecipeStackNavigator.Screen
      name="categories"
      component={CategoryScreen}
      options={categoryScreenOptions}
    />
    <RecipeStackNavigator.Screen
      name="recipes"
      component={RecipesOverviewScreen}
      options={recipesScreenOptions}
    />
    <RecipeStackNavigator.Screen name="details" component={RecipeDetailsScreen} />
    <RecipeStackNavigator.Screen name="settings" component={SettingsScreen} />
    <RecipeStackNavigator.Screen name="edit" component={EditRecipeScreen} />
  </RecipeStackNavigator.Navigator>
);

export default MainNavigator;
