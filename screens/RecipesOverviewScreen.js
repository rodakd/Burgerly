import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import { IoniconsHeaderButton } from '../components';
import { ADD_MODE } from './EditRecipeScreen';

const RecipesOverviewScreen = (props) => {
  const { navigation, route } = props;

  const category = route.params.item;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="add"
            iconName={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
            onPress={() => {
              navigation.navigate('edit', { mode: ADD_MODE });
            }}
          />
        </HeaderButtons>
      ),
      headerTitle: category.title,
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList keyExtractor={(item) => item.id.toString()} />
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
