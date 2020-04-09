import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export const ADD_MODE = 'ADD_MODE';
export const EDIT_MODE = 'EDIT_MODE';

const EditRecipeScreen = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.mode === ADD_MODE ? 'Add recipe' : 'Edit recipe',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Sup nigga</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default EditRecipeScreen;
