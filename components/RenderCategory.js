import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const RenderCategory = ({ item }) => {
  const window = Dimensions.get('window');

  return (
    <View
      style={{
        width: window.width / 2.5,
        height: window.width / 2.5,
        backgroundColor: item.color,
        ...styles.category,
      }}
    >
      <Text>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    borderRadius: 10,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});

RenderCategory.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
};

export default RenderCategory;
