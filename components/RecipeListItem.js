import React from 'react';
import { ListItem } from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { difficultyPointsToText, difficultyPointsToColor } from './sliders/DifficultySlider';

const RecipeListItem = (props) => {
  const { item, onPress } = props;
  let subtitle = null;
  const calories = item.calories ? `🍔 ${item.calories} kcal` : '';
  const duration = item.duration ? ` ⌚ ${item.duration} min` : '';
  const difficulty = difficultyPointsToText(item.difficulty);
  const difficultyColor = difficultyPointsToColor(item.difficulty);

  if (calories && duration) {
    subtitle = `${calories} ${duration}`;
  } else if (calories) {
    subtitle = calories;
  } else if (duration) {
    subtitle = duration;
  }

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
      subtitle={subtitle}
      rightSubtitle={difficulty}
      rightSubtitleStyle={{ ...styles.difficulty, ...{ color: difficultyColor } }}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: hp(3),
    fontFamily: 'lato-regular',
    color: Colors.secondary,
  },

  subtitle: {
    fontSize: hp(2),
    fontFamily: 'lato-regular',
    color: 'rgb(230,230,230)',
    marginTop: hp(1.5),
  },

  difficulty: {
    fontSize: hp(2),
    fontFamily: 'lato-bold',
  },

  avatar: {
    width: hp(10),
    height: hp(10),
  },
});

RecipeListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    calories: PropTypes.number,
    duration: PropTypes.number,
    difficulty: PropTypes.number,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default RecipeListItem;
