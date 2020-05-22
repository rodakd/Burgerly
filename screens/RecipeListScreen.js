import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import { IoniconsHeaderButton, RecipeListItem } from '../components';
import { setRecipes } from '../store/recipes/recipesActions';

const RecipeListScreen = (props) => {
  const { navigation, route } = props;
  const { category } = route.params;
  const recipes = useSelector((state) => state.root.recipes);
  const dispatch = useDispatch();

  const shortenCategoryName = (name) => {
    const oldName = name.slice(' ');
    const newName = [];

    oldName.reduce((acc, cur) => {
      if (acc + cur.length <= 15) {
        newName.push(cur);
      }
      return acc + cur.length;
    }, 0);

    return newName.join(' ');
  };

  useEffect(() => {
    dispatch(setRecipes(category.id));
    const title = `${shortenCategoryName(category.title)} ...`;
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="add"
            iconName={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
            onPress={() => {
              navigation.navigate('edit', { category });
            }}
          />
        </HeaderButtons>
      ),
      headerTitle: title,
    });
  }, [navigation, dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={recipes}
        renderItem={({ item }) => (
          <RecipeListItem
            onPress={() => navigation.navigate('details', { recipe: item })}
            item={item}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default RecipeListScreen;
