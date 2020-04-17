import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import Touchable from './Touchable';

const AddRecipeButton = (props) => {
  const { onPress, color } = props;

  return (
    <Touchable noRipple style={{ ...styles.container, ...{ width: hp(10) } }} onPress={onPress}>
      <Text style={{ ...styles.label, ...{ fontSize: hp(2.3), color } }}>Add</Text>
      <Icon type="ionicon" name="md-add" size={hp(2.3)} color={color} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(60,60,60,0.7)',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'raleway-regular',
    marginRight: 10,
  },
});

AddRecipeButton.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

AddRecipeButton.defaultProps = {
  color: 'white',
};

export default AddRecipeButton;
