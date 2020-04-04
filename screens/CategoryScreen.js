import React, { useEffect } from 'react';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import RenderCategory from '../components/RenderCategory';
import * as recipeActions from '../store/recipeActions';
import IoniconsHeaderButton from '../components/IoniconsHeaderButton';

const CategoryScreen = () => {
  const categories = [];

  useEffect(() => {
    recipeActions.getRecipes();
  });

  return (
    <FlatList
      numColumns={2}
      renderItem={({ item }) => <RenderCategory item={item} />}
      data={categories}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export const categoryScreenOptions = {
  headerTitle: 'Categories',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <Item title="add" iconName={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'} />
    </HeaderButtons>
  ),
};

export default CategoryScreen;
