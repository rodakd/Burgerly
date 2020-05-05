import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';
import EditButton from './EditButton';

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
      {data.map((item) => (
        <Text key={item.key} style={styles.listItem}>
          {item.text}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(3),
    alignSelf: 'flex-start',
  },
  listHeader: {
    flexDirection: 'row',
  },
  listItem: {
    fontSize: hp(3),
    fontFamily: 'raleway-bold',
    color: Colors.secondary,
    marginTop: hp(1),
  },
  label: {
    fontFamily: 'raleway-regular',
    color: Colors.secondary,
    fontSize: hp(3),
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
