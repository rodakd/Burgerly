import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { setCategories, addCategory, editCategory } from '../store/categories/categoriesActions';
import Colors from '../constants/Colors';
import { IoniconsHeaderButton, EditCategoryModal, RenderCategory } from '../components';

const CategoryScreen = (props) => {
  const { navigation } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTrashMode, setIsTrashMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const categories = useSelector((state) => state.root.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategories());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Categories',
      headerRight: () => {
        if (isTrashMode)
          return (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              <Item title="done" iconName="md-checkmark" onPress={() => setIsTrashMode(false)} />
            </HeaderButtons>
          );
        if (isEditMode)
          return (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              <Item title="done" iconName="md-checkmark" onPress={() => setIsEditMode(false)} />
            </HeaderButtons>
          );
        return (
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item title="edit" iconName="md-create" onPress={() => setIsEditMode(true)} />
            <Item title="trash" iconName="md-trash" onPress={() => setIsTrashMode(true)} />
            <Item title="add" iconName="md-add" onPress={() => setIsModalVisible(true)} />
          </HeaderButtons>
        );
      },
    });
  }, [isTrashMode, isEditMode]);

  const handleEditItem = (item) => {
    setEditedItem(item);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditedItem(null);
    setIsModalVisible(false);
    dispatch(setCategories());
  };

  return (
    <>
      <EditCategoryModal
        isVisible={isModalVisible}
        onBackdropPress={handleCloseModal}
        onCreateNewItem={(title, color) => {
          dispatch(addCategory(title, color));
        }}
        onEditItem={(id, title, color) => {
          dispatch(editCategory(id, title, color));
        }}
        editedItem={editedItem}
      />
      <View style={{ backgroundColor: Colors.background, flex: 1 }}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          numColumns={2}
          renderItem={({ item }) => (
            <RenderCategory
              item={item}
              onPress={() => navigation.navigate('recipes', { category: item })}
              onPressInEditMode={handleEditItem}
              trashMode={isTrashMode}
              editMode={isEditMode}
            />
          )}
          data={categories}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
};

export default CategoryScreen;
