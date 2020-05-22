import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { IoniconsHeaderButton, ImageWithOverlay, List } from '../components';
import Colors from '../constants/Colors';
import { trashRecipe } from '../store/recipes/recipesActions';
import {
  difficultyPointsToText,
  difficultyPointsToColor,
} from '../components/sliders/DifficultySlider';
import { shortenHeaderTitle } from '../helper/nav';

const RecipeDetailsScreen = (props) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();

  const { recipe } = route.params;
  const { id, image, title, duration, difficulty, calories } = recipe;
  const ingredients = JSON.parse(recipe.ingredients);
  const steps = JSON.parse(recipe.steps);
  const difficultyText = difficultyPointsToText(difficulty);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: shortenHeaderTitle(title),
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
                dispatch(trashRecipe(id));
                navigation.goBack();
              }}
            />
          </HeaderButtons>
        );
      },
    });
  }, [navigation]);

  return (
    <>
      <ScrollView style={styles.container}>
        {image ? (
          <ImageWithOverlay image={image} text={title} />
        ) : (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        <View style={styles.description}>
          <View style={styles.attributesContainer}>
            <View style={styles.difficultyContainer}>
              <Text style={styles.attributes}>Difficulty: </Text>
              <Text
                style={{ ...styles.attributes, ...{ color: difficultyPointsToColor(difficulty) } }}
              >
                {difficultyText}
              </Text>
            </View>
            {duration ? <Text style={styles.attributes}>Duration: {duration} mins</Text> : <View />}
            {calories ? <Text style={styles.attributes}>Calories: {calories} kcal</Text> : <View />}
          </View>
          <Text style={styles.ingredientsHeader}>Ingredients</Text>
          <List data={ingredients} withCheckboxes />
          <View style={styles.fill} />
        </View>
      </ScrollView>
      <View style={styles.absoluteView} pointerEvents="box-none">
        <View style={styles.cookButtonContainer}>
          <Button
            type="solid"
            titleStyle={styles.cookButtonTitle}
            title="Cook"
            buttonStyle={styles.cookButtonBackground}
            onPress={() => navigation.navigate('steps', { steps })}
          />
        </View>
      </View>
    </>
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

  header: {
    paddingLeft: wp(2),
    paddingTop: hp(2),
  },

  title: {
    fontFamily: 'lato-regular',
    fontSize: hp(5),
    color: Colors.secondary,
  },

  description: {
    padding: hp(2),
  },

  difficultyContainer: {
    flexDirection: 'row',
  },

  attributes: {
    fontFamily: 'lato-regular',
    fontSize: hp(2.5),
    color: Colors.secondary,
    marginTop: hp(1),
  },

  ingredientsHeader: {
    fontFamily: 'lato-bold',
    fontSize: hp(3),
    color: Colors.secondary,
    marginTop: hp(2),
  },

  absoluteView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  cookButtonContainer: {
    width: wp(40),
    paddingBottom: hp(2),
    paddingRight: wp(3),
  },

  cookButtonTitle: {
    fontFamily: 'lato-bold',
    color: Colors.primary,
  },

  cookButtonBackground: {
    backgroundColor: Colors.tertiary,
  },

  fill: {
    height: hp(6),
  },
});

export default RecipeDetailsScreen;
