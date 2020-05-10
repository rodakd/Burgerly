import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import { IoniconsHeaderButton } from '../components';
import Colors from '../constants/Colors';
import { trashRecipe } from '../store/recipes/recipesActions';

const RecipeDetailsScreen = (props) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const { recipe } = route.params;
  const { image } = recipe;
  const ingredients = JSON.parse(recipe.ingredients);
  const steps = JSON.parse(recipe.steps);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
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
    <View style={styles.container}>
      {recipe.image && <Image style={styles.image} source={{ uri: image }} />}
      <Text style={styles.title}> {recipe.title} </Text>
      <Text style={styles.attributes}> {recipe.calories} </Text>
      <Text style={styles.attributes}> {recipe.duration} </Text>
      <Text style={styles.attributes}> {recipe.difficulty} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: wp(100),
    height: hp(40),
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'lato-regular',
    fontSize: hp(5),
    color: Colors.secondary,
  },
  attributes: {
    fontFamily: 'lato-regular',
    fontSize: hp(2),
    color: Colors.secondary,
  },
});

export default RecipeDetailsScreen;
