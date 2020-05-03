import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import { RenderDragListItem, IconButton, IoniconsHeaderButton } from '../components';

export const INGREDIENTS = 'INGREDIENTS';
export const STEPS = 'STEPS';

const DragListScreen = (props) => {
  const { navigation, route } = props;
  const { type, data } = route.params;
  const [items, setItems] = useState(data);
  const [inputValue, setInputValue] = useState('');
  const [highestKey, setHighestKey] = useState(0);

  const addItem = () => {
    if (inputValue.length !== 0) {
      setHighestKey((state) => state + 1);
      setItems((state) => state.concat({ key: highestKey, text: inputValue }));
      setInputValue('');
    }
  };

  const deleteItem = (key) => {
    setItems((state) => state.filter((item) => item.key !== key));
  };

  const handleSubmit = () => {
    navigation.navigate(
      'edit',
      type === INGREDIENTS ? { newIngredients: items } : { newSteps: items }
    );
  };

  useEffect(() => {
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].key > highestKey) setHighestKey(items[i].key + 1);
    }

    navigation.setOptions({
      headerTitle: type === INGREDIENTS ? 'Recipe ingredients' : 'Recipe steps',
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item title="done" iconName="md-checkmark" onPress={handleSubmit} />
          </HeaderButtons>
        );
      },
    });
  }, [navigation, items]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{type === INGREDIENTS ? 'Ingredients' : 'Steps'}</Text>
      <DraggableFlatList
        data={items}
        renderItem={({ item, drag }) => (
          <RenderDragListItem item={item} drag={drag} type={type} onDelete={deleteItem} />
        )}
        keyExtractor={(item) => `draggable-item-${item.key}`}
        onDragEnd={(newItems) => setItems(newItems.data)}
      />
      <View style={styles.inputContainer}>
        <TextInput value={inputValue} onChangeText={setInputValue} style={styles.input} />
        <IconButton buttonStyle={styles.addButton} iconName="md-add" onPress={addItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: hp(5),
    fontFamily: 'raleway-regular',
    color: Colors.secondary,
    marginBottom: hp(2),
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: hp(3),
  },
  input: {
    flex: 1,
    fontSize: hp(3),
    paddingVertical: hp(1),
    paddingHorizontal: hp(1),
    backgroundColor: Colors.inputBackground,
    color: Colors.secondary,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: hp(2),
    backgroundColor: Colors.primary,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

DragListScreen.propTypes = {};
DragListScreen.defaultProps = {};

export default DragListScreen;
