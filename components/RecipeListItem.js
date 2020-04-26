import React from 'react';
import { ListItem } from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const RecipeListItem = (props) => {
  const { item, onPress } = props;

  return (
    <ListItem
      titleStyle={styles.title}
      subtitleStyle={styles.subtitle}
      containerStyle={{ backgroundColor: Colors.primary }}
      title={item.title}
      leftAvatar={
        item.image
          ? {
              source: { uri: item.image },
              style: styles.avatar,
            }
          : {
              source: require('../assets/icon.png'),
              style: styles.avatar,
            }
      }
      subtitle={`🍔 ${item.calories} kcal  ⌚ ${item.duration} min`}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  title: { fontSize: hp(4), fontFamily: 'raleway-regular', color: 'white' },
  subtitle: {
    fontSize: hp(2),
    fontFamily: 'source-regular',
    color: 'rgb(230,230,230)',
  },
  avatar: { width: hp(10), height: hp(10) },
});

RecipeListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    calories: PropTypes.number,
    duration: PropTypes.number,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default RecipeListItem;
