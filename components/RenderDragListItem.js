import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconButton from './common/IconButton';
import Touchable from './common/Touchable';
import Colors from '../constants/Colors';

const RenderDragListItem = (props) => {
  const { item, drag, type, onDelete } = props;

  return (
    <Touchable noRipple onLongPress={drag} onPress={() => {}}>
      <View
        style={{
          ...styles.container,
          ...{
            backgroundColor: type === 'INGREDIENTS' ? 'green' : Colors.tertiary,
          },
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            color: type === 'INGREDIENTS' ? Colors.secondary : Colors.primary,
            fontSize: hp(4),
            width: wp(80),
          }}
          multiline
        >
          {item.text}
        </Text>
        <IconButton
          iconName="md-trash"
          onPress={() => onDelete(item.key)}
          iconSize={hp(4)}
          iconColor={type === 'INGREDIENTS' ? Colors.secondary : Colors.primary}
        />
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp(2),
    alignItems: 'center',
    marginBottom: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

RenderDragListItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
  drag: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RenderDragListItem;
