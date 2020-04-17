import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';

const DurationSlider = (props) => {
  const { value, onValueChange } = props;

  return (
    <>
      {value ? (
        <Text style={{ ...styles.label, ...{ fontSize: hp(3), marginBottom: hp(2) } }}>
          Duration: {value} mins
        </Text>
      ) : (
        <Text style={{ ...styles.label, ...{ fontSize: hp(3), marginBottom: hp(2) } }}>
          No duration
        </Text>
      )}
      <Slider
        minimumValue={0}
        maximumValue={60}
        value={value}
        onValueChange={onValueChange}
        step={5}
        minimumTrackTintColor="white"
        maximumTrackTintColor="grey"
        thumbTintColor={Colors.secondary}
      />
    </>
  );
};

DurationSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'raleway-regular',
    color: 'white',
  },
});

export default DurationSlider;