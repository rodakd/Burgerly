import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { trashCategory } from '../store/recipeActions';

const RenderCategory = ({ item, onPress, onPressInEditMode, trashMode, editMode }) => {
  const dispatch = useDispatch();

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const deleteButton = (
    <TouchableCmp onPress={() => dispatch(trashCategory(item.id))}>
      <View
        style={{
          ...styles.deleteButton,
          ...{
            width: wp(7),
            height: wp(7),
            borderRadius: wp(3.5),
            left: wp(40),
          },
        }}
      >
        <Icon type="ionicon" name="md-close" size={wp(6)} color="white" />
      </View>
    </TouchableCmp>
  );

  const editButton = (
    <TouchableCmp onPress={onPressInEditMode}>
      <View style={styles.editButton}>
        <Icon type="ionicon" name="md-create" size={wp(20)} color="white" />
      </View>
    </TouchableCmp>
  );

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
        <TouchableCmp
          onPress={trashMode || editMode ? null : onPress}
          useForeground
          onLongPress={() => Alert.alert('Long pressed', '', [{ text: 'Yes' }])}
        >
          <View
            style={
              editMode
                ? { ...styles.container, ...{ backgroundColor: 'rgba(0, 0, 0, 0.7)' } }
                : styles.container
            }
          >
            <Text style={{ fontSize: wp(6), textAlign: 'center', padding: wp(4) }}>
              {item.title}
            </Text>
            {editMode && editButton}
          </View>
        </TouchableCmp>
      </View>
      {trashMode && deleteButton}
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
