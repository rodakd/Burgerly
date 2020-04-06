/* eslint-disable react/prop-types */
// Prop-types gives an error when forwarding a ref

import React, { useState, forwardRef } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const LIGHT_GREY = '#666';
const BLUE = '#4961ff';
const RED = '#ff0015';

const Input = (props, ref) => {
  const {
    containerStyle,
    labelStyle,
    onFocusColor = BLUE,
    errorMessage,
    value,
    onChangeText,
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
      <Text style={labelStyleMerged}> Category name </Text>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        selectionColor={underlineColor}
        underlineColorAndroid={underlineColor}
      />
      {errorMessage ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
  },
  label: {
    color: LIGHT_GREY,
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    paddingLeft: 6,
  },
  errorMessage: {
    color: RED,
  },
});

export default forwardRef(Input);
