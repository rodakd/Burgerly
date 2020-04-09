import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const RecipeDetailsScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Sup nigga</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default RecipeDetailsScreen;
