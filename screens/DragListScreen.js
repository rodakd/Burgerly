import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useHeaderHeight } from '@react-navigation/stack';
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
  const headerHeight = useHeaderHeight();

  const addItem = () => {
    if (inputValue.length !== 0) {
      const newHighestKey = highestKey + 1;
      setHighestKey(newHighestKey);
      setItems((state) => state.concat({ key: newHighestKey, text: inputValue }));
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
    items.forEach((item) => {
      if (item.key > highestKey) {
        setHighestKey(item.key);
      }
    });

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
  }, [navigation, items, route, highestKey]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      {...(Platform.OS === 'ios'
        ? { behavior: 'padding' }
        : {
            //  Padding only works on emulators on Android
            //  behavior: 'padding',
          })}
      keyboardVerticalOffset={headerHeight}
    >
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: Colors.background,
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: hp(5),
    fontFamily: 'lato-regular',
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

export default DragListScreen;
