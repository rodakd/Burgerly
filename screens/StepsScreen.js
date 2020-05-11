import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const StepsScreen = (props) => {
  const {} = props;
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

StepsScreen.propTypes = {};
StepsScreen.defaultProps = {};

export default StepsScreen;
