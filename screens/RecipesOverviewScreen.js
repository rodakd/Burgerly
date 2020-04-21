import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import { IoniconsHeaderButton } from '../components';
import { ADD_MODE } from './EditRecipeScreen';
import { setRecipes } from '../store/recipeActions';
import RecipeListItem from '../components/RecipeListItem';

const RecipesOverviewScreen = (props) => {
  const { navigation, route } = props;
  const recipes = useSelector((state) => state.recipes.recipes);
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
        data={recipes}
        renderItem={({ item }) => (
          // TODO Extract this
          <RecipeListItem
            containerStyle={{ backgroundColor: Colors.primary }}
            title={item.title}
            leftAvatar={
              item.image
                ? {
                    source: { uri: item.image },
                    style: { width: hp(10), height: hp(10) },
                  }
                : {
                    source: require('../assets/icon.png'),
                    style: { width: hp(10), height: hp(10) },
                  }
            }
            subtitle={`🍔 ${item.calories} kcal  ⌚ ${item.duration} min`}
            titleStyle={{ fontSize: hp(4), fontFamily: 'raleway-regular', color: 'white' }}
            subtitleStyle={{
              fontSize: hp(2),
              fontFamily: 'source-regular',
              color: 'rgb(230,230,230)',
            }}
            onPress={() => navigation.navigate('details', { recipe: item })}
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

export const recipesScreenOptions = () => {
  return {};
};

export default RecipesOverviewScreen;
