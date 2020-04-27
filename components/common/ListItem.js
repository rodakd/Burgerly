import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconButton from './IconButton';

const ListItem = (props) => {
  const { id, text, onDelete } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.description} multiline>
        {id}. {text}
      </Text>
      <IconButton
        iconName="md-arrow-round-up"
        onPress={() => {}}
        iconSize={hp(2.8)}
        buttonStyle={styles.button}
      />
      <IconButton
        iconName="md-arrow-round-down"
        onPress={() => {}}
        iconSize={hp(2.8)}
        buttonStyle={styles.button}
      />
      <IconButton
        iconName="md-trash"
        onPress={() => onDelete(id)}
        iconSize={hp(2.8)}
        buttonStyle={styles.button}
      />
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
  description: {
    fontFamily: 'source-bold',
    color: 'white',
    fontSize: hp(2.8),
    marginRight: hp(1.3),
  },
  button: { marginRight: hp(1) },
});

ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ListItem;
