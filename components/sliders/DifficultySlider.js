import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';

export const difficultyPointsToText = (points) => {
  switch (points) {
    case 1:
      return 'Easy';
    case 2:
      return 'Medium';
    case 3:
      return 'Hard';
    default:
      return 'Very hard';
  }
};

const DifficultySlider = (props) => {
  const { value, onValueChange } = props;

  return (
    <>
      <Text style={styles.label}>Difficulty: {difficultyPointsToText(value)}</Text>
      <Slider
        minimumValue={1}
        maximumValue={4}
        value={value}
        onValueChange={onValueChange}
        step={1}
        minimumTrackTintColor={Colors.secondary}
        maximumTrackTintColor="grey"
        thumbTintColor={Colors.secondary}
      />
    </>
  );
};

DifficultySlider.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'raleway-regular',
    color: Colors.secondary,
    fontSize: hp(3),
    marginBottom: hp(2),
    marginTop: hp(4),
  },
});

export default DifficultySlider;
