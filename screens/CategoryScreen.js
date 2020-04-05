import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Platform, Text, StyleSheet, Dimensions, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-gesture-handler';
import RenderCategory from '../components/RenderCategory';
import * as recipeActions from '../store/recipeActions';
import IoniconsHeaderButton from '../components/IoniconsHeaderButton';

const CategoryScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const categories = [];
  const input = useRef(null);

  useEffect(() => {
    recipeActions.getRecipes();
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="add"
            iconName={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
            onPress={() => {
              setIsModalVisible(true);
            }}
          />
        </HeaderButtons>
      ),
    });
  });

  return (
    <View>
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        useNativeDriver
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View style={styles.card}>
          <Text style={styles.cardHeader}> New category </Text>
          <Input ref={input} label="Category name" containerStyle={{ margin: 10 }} />
          <Button title="Add category" onPress={() => console.log(input.current.isFocused())} />
        </View>
      </Modal>
      <FlatList
        numColumns={2}
        renderItem={({ item }) => <RenderCategory item={item} />}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    width: Dimensions.get('window').width / 1.3,
    height: Dimensions.get('window').height / 2,
    borderRadius: 20,
    alignItems: 'center',
    padding: 10,
  },
  cardHeader: {
    fontSize: 24,
  },
});

export const categoryScreenOptions = (navData) => {
  return {
    headerTitle: 'Categories',
  };
};

export default CategoryScreen;
