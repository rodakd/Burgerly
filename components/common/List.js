import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';

const List = (props) => {
  const { data, withCheckboxes } = props;
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setIngredients(
      data.map((ing) => {
        const newIngredient = ing;
        newIngredient.isChecked = false;
        return newIngredient;
      })
    );
  }, [data]);

  const toggleCheckbox = (key) => {
    setIngredients((state) =>
      state.map((ing) => {
        if (ing.key === key) {
          const newIng = ing;
          newIng.isChecked = !newIng.isChecked;
          return newIng;
        }
        return ing;
      })
    );
  };

  return (
    <View>
      {ingredients.map((item) => {
        return (
          <View key={item.key} style={styles.container}>
            {withCheckboxes ? (
              <CheckBox
                checked={item.isChecked}
                onPress={() => toggleCheckbox(item.key)}
                title={item.text}
                textStyle={styles.itemText}
                containerStyle={styles.checkboxContainer}
              />
            ) : (
              <Text style={styles.itemText}>{item.text}</Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.5),
    marginLeft: wp(4),
  },

  itemText: {
    fontFamily: 'lato-regular',
    fontSize: hp(2.5),
    color: Colors.secondary,
    marginBottom: hp(0.5),
  },

  checkboxContainer: {
    backgroundColor: Colors.background,
    borderWidth: 0,
    alignItems: 'center',
    padding: 0,
  },
});

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      text: PropTypes.string,
    })
  ).isRequired,
  withCheckboxes: PropTypes.bool,
};

List.defaultProps = {
  withCheckboxes: false,
};

export default List;
