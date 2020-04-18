import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Platform, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import { IoniconsHeaderButton } from '../components';
import { ADD_MODE } from './EditRecipeScreen';
import { setRecipes } from '../store/recipeActions';

const RecipesOverviewScreen = (props) => {
  const { navigation, route } = props;
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const category = route.params.item;

  useEffect(() => {
    dispatch(setRecipes());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="add"
            iconName={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
            onPress={() => {
              navigation.navigate('edit', { mode: ADD_MODE, categoryId: category.id });
            }}
          />
        </HeaderButtons>
      ),
      headerTitle: category.title,
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        // data={recipes}
        // renderItem={({ item }) => <Text> {item.title} </Text>}
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

export const recipesScreenOptions = () => {
  return {};
};

export default RecipesOverviewScreen;
