import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  RecipeDetailsScreen,
  RecipeListScreen,
  SettingsScreen,
  EditRecipeScreen,
  DragListScreen,
} from '../screens';
import CategoryScreen from '../screens/CategoryScreen';
import Colors from '../constants/Colors';
import StepsScreen from '../screens/StepsScreen';

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
    <RecipeStackNavigator.Screen name="recipes" component={RecipeListScreen} />
    <RecipeStackNavigator.Screen name="details" component={RecipeDetailsScreen} />
    <RecipeStackNavigator.Screen name="settings" component={SettingsScreen} />
    <RecipeStackNavigator.Screen name="edit" component={EditRecipeScreen} />
    <RecipeStackNavigator.Screen name="draglist" component={DragListScreen} />
    <RecipeStackNavigator.Screen name="steps" component={StepsScreen} />
  </RecipeStackNavigator.Navigator>
);

export default MainNavigator;
