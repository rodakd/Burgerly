import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const RenderCategory = ({ item, onPress }) => {
  const window = Dimensions.get('window');

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View
      style={{
        height: window.height / 4,
        width: window.width / 2.5,
        backgroundColor: item.color,
        ...styles.category,
      }}
    >
      <TouchableCmp onPress={onPress} useForeground>
        <View style={styles.container}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    borderRadius: 10,
    margin: 20,
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
    fontSize: Dimensions.get('window').width / 15,
  },
});

RenderCategory.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default RenderCategory;
