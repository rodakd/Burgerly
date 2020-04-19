import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const RecipeListItem = (props) => {
  const { text } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.recipeName}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  recipeName: {
    fontSize: 24,
    fontFamily: 'raleway-regular',
  },
});

RecipeListItem.propTypes = {
  text: PropTypes.string.isRequired,
};
RecipeListItem.defaultProps = {};

export default RecipeListItem;
