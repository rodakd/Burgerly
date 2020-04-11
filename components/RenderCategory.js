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

const RenderCategory = ({ item, onPress, trashMode }) => {
  const window = Dimensions.get('window');
  const dispatch = useDispatch();

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

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
          onPress={trashMode ? null : onPress}
          useForeground
          onLongPress={() => Alert.alert('Long pressed', '', [{ text: 'Yes' }])}
        >
          <View style={styles.container}>
            <Text style={{ fontSize: wp(6), textAlign: 'center', padding: wp(4) }}>
              {item.title}
            </Text>
          </View>
        </TouchableCmp>
      </View>
      {trashMode && (
        <TouchableCmp onPress={() => dispatch(trashCategory(item.id))}>
          <View
            style={{
              ...styles.circle,
              ...{
                width: window.width / 15,
                height: window.width / 15,
                borderRadius: window.width / 30,
                left: window.width / 2.5,
              },
            }}
          >
            <Icon type="ionicon" name="md-close" size={window.width / 16} color="white" />
          </View>
        </TouchableCmp>
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

  circle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ff3a33',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    marginTop: 5,
  },
});

RenderCategory.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
  trashMode: PropTypes.bool,
};

RenderCategory.defaultProps = {
  onPress: () => {},
  trashMode: false,
};

export default RenderCategory;
