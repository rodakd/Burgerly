import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { trashCategory } from '../store/recipeActions';
import Touchable from './common/Touchable';
import IconButton from './common/IconButton';

const RenderCategory = (props) => {
  const { item, onPress, onPressInEditMode, trashMode, editMode } = props;
  const dispatch = useDispatch();

  return (
    <View>
      <View
        style={{
          height: wp(40),
          width: wp(40),
          borderRadius: wp(4),
          margin: wp(4),
          backgroundColor: item.color,
          ...styles.category,
        }}
      >
        <Touchable onPress={trashMode || editMode ? null : onPress} useForeground>
          <View
            style={
              editMode
                ? { ...styles.container, ...{ backgroundColor: 'rgba(0, 0, 0, 0.7)' } }
                : styles.container
            }
          >
            <Text
              style={{
                fontSize: wp(6),
                textAlign: 'center',
                padding: wp(4),
                fontFamily: 'raleway-regular',
              }}
            >
              {item.title}
            </Text>
            {editMode && (
              <IconButton
                onPress={() => onPressInEditMode(item)}
                buttonStyle={styles.editButton}
                iconSize={wp(20)}
                iconName="md-create"
              />
            )}
          </View>
        </Touchable>
      </View>
      {trashMode && (
        <IconButton
          onPress={() => dispatch(trashCategory(item.id))}
          buttonStyle={{
            ...styles.deleteButton,
            ...{
              width: wp(7),
              height: wp(7),
              borderRadius: wp(3.5),
              left: wp(40),
            },
          }}
          iconSize={wp(6)}
          iconName="md-close"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'raleway-semibold',
  },

  deleteButton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ff3a33',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    marginTop: 5,
  },
  editButton: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
});

RenderCategory.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
  onPressInEditMode: PropTypes.func,
  trashMode: PropTypes.bool,
  editMode: PropTypes.bool,
};

RenderCategory.defaultProps = {
  onPress: () => {},
  onPressInEditMode: () => {},
  trashMode: false,
  editMode: false,
};

export default RenderCategory;
