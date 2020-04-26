// TODO Extract components
// TODO Fix trash can moving to right side of the screen
// TODO Take a photo from storage

import React, { useEffect, useState, useRef } from 'react';
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
import { Icon } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import { useHeaderHeight } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import ImagePick from '../components/ImagePick';
import {
  DurationSlider,
  DifficultySlider,
  Ingredient,
  AddButton,
  Step,
  IoniconsHeaderButton,
} from '../components';
import { addRecipe, editRecipe } from '../store/recipes/recipesActions';

const EditRecipeScreen = (props) => {
  const { navigation, route } = props;
  const { category } = route.params;
  const editedRecipe = route.params.recipe;
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const ref = useRef();

  const [title, setTitle] = useState(editedRecipe ? editedRecipe.title : 'New recipe');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState(editedRecipe ? editedRecipe.image : null);
  const [duration, setDuration] = useState(editedRecipe ? editedRecipe.duration : 10);
  const [difficulty, setDifficulty] = useState(editedRecipe ? editedRecipe.difficulty : 1);
  const [calories, setCalories] = useState(editedRecipe ? editedRecipe.calories.toString() : '0');
  const [ingredients, setIngredients] = useState(editedRecipe ? editedRecipe.ingredients : []);
  const [ingredientInput, setIngredientInput] = useState('');
  const [steps, setSteps] = useState(editedRecipe ? editedRecipe.steps : []);
  const [stepInput, setStepInput] = useState('');

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
  }, [navigation, handleFinishRecipe, ingredients, steps, duration, difficulty, title, calories]);

  const handleFinishRecipe = () => {
    if (validateRecipe()) {
      if (!editedRecipe) {
        dispatch(
          addRecipe(category.id, title, image, duration, difficulty, calories, ingredients, steps)
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
            calories,
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
    return true;
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleDeleteIngredient = (id) => {
    setIngredients((state) => state.filter((ing) => ing.id !== id));
  };

  const handleDeleteStep = (id) => {
    setSteps((state) => state.filter((step) => step.id !== id));
  };

  const validateCalories = (text) => {
    if (text.length > 1 && text[0] === '0') {
      return;
    }
    const numreg = /^[0-9]+$/;
    if (numreg.test(text) || text === '') {
      setCalories(text);
    }
  };

  const handleAddIngredient = () => {
    if (ingredientInput.length === 0) {
      return;
    }
    const numOfIngredients = ingredients.length;
    const id = numOfIngredients === 0 ? 1 : ingredients[numOfIngredients - 1].id + 1;
    const newIngredient = { id, text: ingredientInput.trim() };
    setIngredientInput('');
    setIngredients((state) => state.concat(newIngredient));
  };

  const handleAddStep = () => {
    if (stepInput.length === 0) {
      return;
    }
    const numOfSteps = steps.length;
    const id = numOfSteps === 0 ? 1 : steps[numOfSteps - 1].id + 1;
    const newStep = { id, text: stepInput.trim() };
    setStepInput('');
    setSteps((state) => state.concat(newStep));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      {...(Platform.OS === 'ios'
        ? { behavior: 'padding' }
        : {
            // Padding only works on emulators on Android
            //  behavior: 'padding',
          })}
      keyboardVerticalOffset={headerHeight + 20}
    >
      <ScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <Modal
            isVisible={isModalVisible}
            useNativeDriver
            onBackdropPress={handleCloseModal}
            onModalShow={() => ref.current.focus()}
            style={styles.modal}
            backdropOpacity={0.9}
          >
            <Text style={styles.modalTitleLabel}>Enter recipe name</Text>
            <TextInput
              ref={ref}
              value={title}
              onChangeText={setTitle}
              style={styles.modalTextInput}
              maxLength={50}
            />
          </Modal>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{title}</Text>
            <Icon
              name="md-create"
              type="ionicon"
              size={wp(7)}
              color="white"
              onPress={handleOpenModal}
              underlayColor={Colors.background}
            />
          </View>
          <ImagePick image={image} onSetImage={setImage} />
          <View style={styles.inputsContainer}>
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
                onFocus={() => setCalories('')}
                onBlur={() => {
                  if (calories.length === 0) {
                    setCalories('0');
                  }
                }}
              />
            </View>
            <View style={styles.ingredientsContainer}>
              <Text style={styles.label}>Ingredients:</Text>
              {ingredients.map((ing) => (
                <Ingredient
                  key={ing.id}
                  id={ing.id}
                  text={ing.text}
                  onDelete={handleDeleteIngredient}
                />
              ))}
              <View style={styles.addIngredient}>
                <TextInput
                  style={styles.addIngredientInput}
                  onChangeText={setIngredientInput}
                  value={ingredientInput}
                />
                <AddButton onPress={handleAddIngredient} />
              </View>
            </View>
            <View style={styles.ingredientsContainer}>
              <Text style={styles.label}>Steps:</Text>
              {steps.map((step) => (
                <Step key={step.id} id={step.id} text={step.text} onDelete={handleDeleteStep} />
              ))}
              <View style={styles.addIngredient}>
                <TextInput
                  style={styles.addIngredientInput}
                  onChangeText={setStepInput}
                  value={stepInput}
                />
                <AddButton onPress={handleAddStep} />
              </View>
            </View>
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
    padding: wp(4),
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'raleway-regular',
    textAlign: 'center',
    fontSize: hp(5),
    padding: wp(2),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(7),
  },
  modalTitleLabel: {
    color: 'white',
    fontFamily: 'raleway-regular',
    fontSize: hp(4),
  },
  modalTextInput: {
    backgroundColor: 'white',
    fontFamily: 'raleway-regular',
    paddingVertical: 5,
    marginVertical: 5,
    textAlign: 'center',
    width: '70%',
    fontSize: hp(4),
  },
  inputsContainer: {
    alignSelf: 'flex-start',
    width: '100%',
    marginTop: hp(4),
  },
  label: {
    fontFamily: 'raleway-regular',
    color: 'white',
    fontSize: hp(3),
  },
  addIngredient: {
    flexDirection: 'row',
    marginTop: 10,
  },
  addIngredientInput: {
    fontFamily: 'source-regular',
    width: '40%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: Colors.inputBackground,
    color: 'white',
    fontSize: hp(3),
  },
  caloriesContainer: {
    marginTop: hp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  caloriesInput: {
    fontSize: hp(4),
    backgroundColor: Colors.inputBackground,
    color: 'white',
    textAlign: 'center',
    marginLeft: 10,
    paddingHorizontal: 5,
    fontFamily: 'source-regular',
    borderRadius: 10,
    width: '15%',
  },
  ingredientsContainer: {
    marginTop: hp(3),
  },
});

export default EditRecipeScreen;
