import React, { useEffect, useState } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import RenderCategory from '../components/RenderCategory';
import * as recipeActions from '../store/recipeActions';
import IoniconsHeaderButton from '../components/IoniconsHeaderButton';

const CategoryScreen = ({ navigation }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const categories = [];

  useEffect(() => {
    recipeActions.getRecipes();
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="add"
            iconName={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
            onPress={() => {
              setIsOverlayVisible(true);
            }}
          />
        </HeaderButtons>
      ),
    });
  });

  return (
    <View>
      <FlatList
        numColumns={2}
        renderItem={({ item }) => <RenderCategory item={item} />}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export const categoryScreenOptions = (navData) => {
  return {
    headerTitle: 'Categories',
  };
};

export default CategoryScreen;
