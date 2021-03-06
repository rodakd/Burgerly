import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import Touchable from './Touchable';
import Colors from '../../constants/Colors';

const EditButton = (props) => {
  const { onPress, color } = props;

  return (
    <Touchable noRipple style={styles.container} onPress={onPress}>
      <Text style={{ ...styles.label, ...{ color } }}>Edit</Text>
      <Icon type="ionicon" name="md-create" size={hp(2.3)} color={color} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(60,60,60,0.7)',
    justifyContent: 'center',
    width: hp(10),
    paddingVertical: hp(0.5),
    marginLeft: wp(2),
  },

  label: {
    fontFamily: 'lato-regular',
    marginRight: 10,
    fontSize: hp(2.3),
  },
});

EditButton.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

EditButton.defaultProps = {
  color: Colors.secondary,
};

export default EditButton;
