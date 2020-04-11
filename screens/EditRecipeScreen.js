import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import Input from '../components/Input';

export const ADD_MODE = 'ADD_MODE';
export const EDIT_MODE = 'EDIT_MODE';

const EditRecipeScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('New recipe');
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.mode === ADD_MODE ? 'Add recipe' : 'Edit recipe',
    });
  }, [navigation]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        useNativeDriver
        onBackdropPress={handleCloseModal}
        style={styles.modal}
      >
        <Text style={{ ...styles.modalTitleLabel, fontSize: width / 15 }}> Enter recipe name </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={{ ...styles.modalTextInput, width: width / 1.5 }}
        />
      </Modal>
      <View style={styles.headerContainer}>
        <Text style={{ ...styles.title, fontSize: width / 15 }}>{title}</Text>
        <Icon
          name="md-create"
          type="ionicon"
          size={Dimensions.get('window').width / 15}
          color="white"
          onPress={handleOpenModal}
          underlayColor={Colors.background}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'raleway-bold',
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalTitleLabel: {
    color: 'white',
    fontFamily: 'raleway-regular',
  },
  modalTextInput: {
    backgroundColor: 'white',
    paddingVertical: 5,
    textAlign: 'center',
  },
});

export default EditRecipeScreen;
