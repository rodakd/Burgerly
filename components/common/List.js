import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';

const List = (props) => {
  const { data } = props;

  return (
    <View>
      {data.map((item) => (
        <Text key={item.key} style={styles.item}>
          {item.text}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    fontFamily: 'lato-regular',
    fontSize: hp(2.5),
    color: Colors.secondary,
    marginTop: hp(1.5),
    marginLeft: wp(4),
  },
});

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      text: PropTypes.string,
    })
  ).isRequired,

  label: PropTypes.string,
};

List.defaultProps = {
  label: '',
};

export default List;
