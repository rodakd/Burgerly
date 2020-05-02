import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const IngredientsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

IngredientsScreen.propTypes = {};
IngredientsScreen.defaultProps = {};

export default IngredientsScreen;
