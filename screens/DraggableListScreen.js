import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Colors from '../constants/Colors';

let key = 0;
const getKey = () => {
  key += 1;
  return key;
};

const DraggableListScreen = (props) => {
  const { navigation, route } = props;
  const { headerTitle, name, data, onFinish } = route.params;
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState(data);

  useEffect(() => {
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation]);

  const createNewItem = () => {
    const newItem = { key: getKey(), text: inputValue };
    setItems((state) => state.concat(newItem));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <DraggableFlatList
        data={items}
        onDragEnd={({ newData }) => setItems(newData)}
        keyExtractor={(item) => `${name}-ingredient-${item.key}`}
        renderItem={(item) => <Text style={{ color: 'white' }}>{item.text}</Text>}
      />
      <TextInput value={inputValue} onChangeText={setInputValue} />
      <Button title="Add" onPress={createNewItem} />
      <Button title="Confirm changes" onPress={() => onFinish(items)} />
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
    color: Colors.secondary,
    fontFamily: 'raleway-regular',
  },
});

DraggableListScreen.propTypes = {};
DraggableListScreen.defaultProps = {};

export default DraggableListScreen;
