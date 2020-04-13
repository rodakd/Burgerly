import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';

const Touchable = (props) => {
  const { noRipple } = props;

  if (Platform.OS === 'ios' || noRipple) {
    return <TouchableOpacity {...props} />;
  }
  return <TouchableNativeFeedback {...props} />;
};

Touchable.propTypes = {
  noRipple: PropTypes.bool,
};

Touchable.defaultProps = {
  noRipple: false,
};

export default Touchable;
