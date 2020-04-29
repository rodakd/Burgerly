import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const DraggableListScreen = (props) => {
  const [items, setItems] = useState([]);

  const { text } = props;
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

DraggableListScreen.propTypes = {};
DraggableListScreen.defaultProps = {};

export default DraggableListScreen;
