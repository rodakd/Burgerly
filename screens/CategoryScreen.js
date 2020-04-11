import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import RenderCategory from '../components/RenderCategory';
import * as recipeActions from '../store/recipeActions';
import IoniconsHeaderButton from '../components/IoniconsHeaderButton';
import NewCategoryModal from '../components/NewCategoryModal';
import Colors from '../constants/Colors';

const CategoryScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTrashMode, setIsTrashMode] = useState(false);
  const categories = useSelector((state) => state.recipes.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recipeActions.setCategories());
    navigation.setOptions({
      headerRight: () => {
        if (isTrashMode)
          return (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              <Item title="done" iconName="md-checkmark" onPress={() => setIsTrashMode(false)} />
            </HeaderButtons>
          );
        return (
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item title="trash" iconName="md-trash" onPress={() => setIsTrashMode(true)} />
            <Item title="add" iconName="md-add" onPress={() => setIsModalVisible(true)} />
          </HeaderButtons>
        );
      },
    });
  }, [isModalVisible, isTrashMode]);

  return (
    <>
      <NewCategoryModal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        onSubmit={(title, color) => {
          dispatch(recipeActions.addCategory(title, color));
        }}
      />
      <View style={{ backgroundColor: Colors.background, flex: 1 }}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          numColumns={2}
          renderItem={({ item }) => (
            <RenderCategory
              item={item}
              onPress={() => navigation.navigate('recipes', { item })}
              trashMode={isTrashMode}
            />
          )}
          data={categories}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
};

export const categoryScreenOptions = () => {
  return {
    headerTitle: 'Categories',
  };
};

export default CategoryScreen;
