import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useHeaderHeight } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import ImagePick from '../components/ImagePick';
import { DurationSlider, DifficultySlider, IoniconsHeaderButton, List } from '../components';
import { addRecipe, editRecipe } from '../store/recipes/recipesActions';
import { INGREDIENTS, STEPS } from './DragListScreen';

const EditRecipeScreen = (props) => {
  const { navigation, route } = props;
  const { category, newIngredients, newSteps } = route.params;
  const editedRecipe = route.params.recipe;
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  const [title, setTitle] = useState(editedRecipe ? editedRecipe.title : 'New recipe');
  const [image, setImage] = useState(editedRecipe ? editedRecipe.image : null);
  const [duration, setDuration] = useState(editedRecipe ? editedRecipe.duration : 10);
  const [difficulty, setDifficulty] = useState(editedRecipe ? editedRecipe.difficulty : 1);
  const [calories, setCalories] = useState(editedRecipe ? editedRecipe.calories.toString() : '0');
  const [ingredients, setIngredients] = useState(editedRecipe ? editedRecipe.ingredients : []);
  const [steps, setSteps] = useState(editedRecipe ? editedRecipe.steps : []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: editedRecipe ? 'Edit recipe' : 'Add recipe',
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item title="done" iconName="md-checkmark" onPress={handleFinishRecipe} />
          </HeaderButtons>
        );
      },
    });
    if (newIngredients) {
      setIngredients(newIngredients);
    }
    if (newSteps) {
      setSteps(newSteps);
    }
  }, [
    navigation,
    handleFinishRecipe,
    ingredients,
    steps,
    duration,
    difficulty,
    title,
    calories,
    image,
    route,
  ]);

  const handleFinishRecipe = () => {
    if (validateRecipe()) {
      if (!editedRecipe) {
        dispatch(
          addRecipe(
            category.id,
            title,
            image,
            duration,
            difficulty,
            parseFloat(calories),
            ingredients,
            steps
          )
        );
        navigation.goBack();
      } else {
        dispatch(
          editRecipe(
            editedRecipe.id,
            title,
            image,
            duration,
            difficulty,
            parseFloat(calories),
            ingredients,
            steps
          )
        );
        navigation.navigate('recipes', { category });
      }
    }
  };

  const validateRecipe = () => {
    if (title.length === 0) {
      Alert.alert('Failed to create recipe', 'Please enter the recipe name', [{ text: 'Okay' }]);
      return false;
    }
    if (ingredients.length === 0) {
      Alert.alert('Failed to create recipe', 'Ingredients list must not be empty', [
        { text: 'Okay ' },
      ]);
      return false;
    }
    if (steps.length === 0) {
      Alert.alert('Failed to create recipe', 'Steps list must not be empty', [{ text: 'Okay' }]);
      return false;
    }
    if (calories.length === 0) {
      Alert.alert('Failed to create recipe', 'Calories field must not be empty', [
        { text: 'Okay' },
      ]);
      return false;
    }
    return true;
  };

  const validateCalories = (text) => {
    const numreg = /^[0-9]+$/;
    if (numreg.test(text) || text === '') {
      setCalories(text);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      {...(Platform.OS === 'ios' && { behavior: 'padding' })}
      keyboardVerticalOffset={headerHeight + 20}
    >
      <ScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <ImagePick image={image} onSetImage={setImage} />
          <View style={styles.inputsContainer}>
            <View>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.titleInput}
                onChangeText={setTitle}
                maxLength={100}
                value={title}
                onBlur={() => {
                  if (title.length === 0) {
                    setTitle('New recipe');
                  }
                }}
              />
            </View>
            <DurationSlider value={duration} onValueChange={setDuration} />
            <DifficultySlider value={difficulty} onValueChange={setDifficulty} />
            <View style={styles.caloriesContainer}>
              <Text style={styles.label}>Calories: </Text>
              <TextInput
                style={styles.caloriesInput}
                keyboardType="numeric"
                onChangeText={validateCalories}
                maxLength={4}
                value={calories}
                onBlur={() => {
                  if (calories.length === 0) {
                    setCalories('0');
                  }
                }}
                onFocus={() => {
                  setCalories('');
                }}
              />
            </View>
            <List
              type={INGREDIENTS}
              data={ingredients}
              onEdit={() =>
                navigation.navigate('dragList', { type: INGREDIENTS, data: ingredients })
              }
            />
            <List
              type={STEPS}
              data={steps}
              onEdit={() => navigation.navigate('dragList', { type: STEPS, data: steps })}
            />
          </View>

          <View style={{ flex: 1 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingBottom: hp(1),
  },
  titleInput: {
    fontSize: hp(3),
    backgroundColor: Colors.inputBackground,
    color: Colors.secondary,
    fontFamily: 'lato-regular',
    borderRadius: wp(1),
    paddingHorizontal: wp(2),
    width: wp(80),
    height: hp(5),
    marginTop: hp(1),
  },
  inputsContainer: {
    width: wp(90),
    marginTop: hp(2),
  },
  label: {
    fontFamily: 'lato-regular',
    color: Colors.secondary,
    fontSize: hp(3),
  },
  caloriesContainer: {
    marginTop: hp(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  caloriesInput: {
    fontSize: hp(3),
    backgroundColor: Colors.inputBackground,
    color: Colors.secondary,
    textAlign: 'center',
    marginLeft: wp(1),
    fontFamily: 'lato-regular',
    borderRadius: wp(1),
    width: wp(17),
    height: hp(4.5),
  },
});

export default EditRecipeScreen;
