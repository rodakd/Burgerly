import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';
import EditButton from './EditButton';

// TODO Fix ugly list

const List = (props) => {
  const { data, type, onEdit } = props;

  const lowerCaseType = type.toLowerCase();
  const typeCapitalized =
    lowerCaseType[0].toUpperCase() + lowerCaseType.slice(1, lowerCaseType.length);

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.label}>{typeCapitalized}</Text>
        <EditButton onPress={onEdit} />
      </View>
      {data.map((item, index) => (
        <Text key={item.key} style={styles.listItem}>
          {`${index + 1}. ${item.text}`}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(4),
    alignSelf: 'flex-start',
  },
  listHeader: {
    flexDirection: 'row',
    marginBottom: hp(1),
    height: hp(4),
  },
  listItem: {
    fontSize: hp(2.5),
    fontFamily: 'lato-bold',
    color: Colors.secondary,
    marginTop: hp(1),
  },
  label: {
    fontFamily: 'lato-regular',
    color: Colors.secondary,
    fontSize: hp(3),
    alignSelf: 'center',
  },
});

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      text: PropTypes.string,
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default List;
