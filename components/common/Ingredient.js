import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconButton from './IconButton';

const Ingredient = (props) => {
  const { id, text, onDelete } = props;

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: hp(2.8),
          marginRight: hp(1.3),
          fontFamily: 'source-bold',
          color: 'white',
        }}
      >
        {text}
      </Text>
      <IconButton iconName="md-trash" onPress={() => onDelete(id)} iconSize={hp(2.8)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    marginLeft: hp(2),
  },
});

Ingredient.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Ingredient;