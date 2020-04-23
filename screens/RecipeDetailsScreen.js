// TODO Fix header for long names

import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import { IoniconsHeaderButton } from '../components';
import Colors from '../constants/Colors';
import { trashRecipe } from '../store/recipeActions';

const RecipeDetailsScreen = (props) => {
  const { navigation, route } = props;

  const dispatch = useDispatch();
  const { recipe } = route.params;
  const { title, image, difficulty, duration, calories } = recipe;
  const ingredients = JSON.parse(recipe.ingredients);
  const steps = JSON.parse(recipe.steps);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: recipe.title,
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item
              title="edit"
              iconName="md-create"
              onPress={() => {
                navigation.navigate('edit', { recipe: { ...recipe, ...{ ingredients, steps } } });
              }}
            />
            <Item
              title="trash"
              iconName="md-trash"
              onPress={() => {
                dispatch(trashRecipe(recipe.id));
                navigation.goBack();
              }}
            />
          </HeaderButtons>
        );
      },
    });
  }, [navigation]);

  return (
    <View style={{ ...styles.container, ...{ padding: wp(5) } }}>
      {recipe.image && (
        <Image style={{ ...styles.image, ...{ borderRadius: wp(5) } }} source={{ uri: image }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: '40%',
  },
});

export default RecipeDetailsScreen;
