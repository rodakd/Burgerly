import React, { useState, forwardRef } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

const LIGHT_GREY = '#666';
const BLUE = '#4961ff';
const RED = '#ff0015';

// TODO Remove it

const Input = forwardRef((props, ref) => {
  const {
    label,
    containerStyle,
    labelStyle,
    onFocusColor,
    errorMessage,
    value,
    onChangeText,
    textInputStyle,
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const labelStyleMerged = { ...styles.label, ...labelStyle };
  let underlineColor = LIGHT_GREY;

  if (isFocused) {
    labelStyleMerged.color = onFocusColor;
    underlineColor = onFocusColor;
    if (errorMessage) {
      labelStyleMerged.color = RED;
      underlineColor = RED;
    }
  }

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <Text style={labelStyleMerged}> {label} </Text>
      <TextInput
        {...props}
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        style={textInputStyle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        selectionColor={underlineColor}
        underlineColorAndroid={underlineColor}
      />
      {errorMessage ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 0,
    width: wp(100),
  },
  label: {
    color: LIGHT_GREY,
  },
  errorMessage: {
    color: RED,
  },
});

Input.propTypes = {
  label: PropTypes.string,
  containerStyle: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  labelStyle: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  textInputStyle: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onFocusColor: PropTypes.string,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

Input.defaultProps = {
  label: '',
  containerStyle: {},
  labelStyle: {},
  textInputStyle: {},
  onFocusColor: BLUE,
  errorMessage: '',
  value: '',
  onChangeText: () => {},
};

export default Input;
