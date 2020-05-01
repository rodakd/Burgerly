import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import Touchable from './Touchable';
import Colors from '../../constants/Colors';

const IconButton = (props) => {
  const { onPress, touchableStyle, buttonStyle, iconSize, iconName, iconColor, noRipple } = props;

  return (
    <Touchable onPress={onPress} style={touchableStyle} noRipple={noRipple}>
      <View style={buttonStyle}>
        <Icon type="ionicon" name={iconName} size={iconSize} color={iconColor} />
      </View>
    </Touchable>
  );
};

IconButton.propTypes = {
  onPress: PropTypes.func,
  touchableStyle: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  buttonStyle: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  iconSize: PropTypes.number,
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  noRipple: PropTypes.bool,
};

IconButton.defaultProps = {
  onPress: () => {},
  touchableStyle: {},
  buttonStyle: {},
  iconSize: 24,
  iconColor: Colors.secondary,
  noRipple: false,
};

export default IconButton;
