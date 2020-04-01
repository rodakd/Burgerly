import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const renderCategory = ({ item }) => (
  <View style={styles.category}>
    <Text>{item.title}</Text>
  </View>
);

const styles = StyleSheet.create({
  category: {},
});

renderCategory.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default renderCategory;
