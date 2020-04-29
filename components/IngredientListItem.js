import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const IngredientListItem = (props) => {
  const { text } = props;
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '5%',
  },
});

IngredientListItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default IngredientListItem;
