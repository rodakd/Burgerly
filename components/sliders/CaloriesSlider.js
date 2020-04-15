import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';

const CaloriesSlider = (props) => {
  const { value, onValueChange } = props;

  return (
    <>
      <Text
        style={{ ...styles.label, ...{ fontSize: hp(3), marginBottom: hp(2), marginTop: hp(4) } }}
      >
        Calories: {value} kcal
      </Text>
      <Slider
        minimumValue={0}
        maximumValue={1500}
        value={value}
        onValueChange={onValueChange}
        step={50}
        minimumTrackTintColor="white"
        maximumTrackTintColor="grey"
        thumbTintColor={Colors.secondary}
      />
    </>
  );
};

CaloriesSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'raleway-regular',
    color: 'white',
  },
});

export default CaloriesSlider;
