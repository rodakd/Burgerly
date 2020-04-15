import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import ImagePick from '../components/ImagePick';
import { DurationSlider, DifficultySlider, CaloriesSlider } from '../components';

export const ADD_MODE = 'ADD_MODE';
export const EDIT_MODE = 'EDIT_MODE';

const EditRecipeScreen = (props) => {
  const { navigation, route } = props;

  const [title, setTitle] = useState('New recipe');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState(require('../assets/icon.png'));
  const [duration, setDuration] = useState(10);
  const [difficulty, setDifficulty] = useState(1);
  const [calories, setCalories] = useState(0);

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
    <ScrollView contentContainerStyle={{ ...styles.container, ...{ padding: wp(5) } }}>
      <Modal
        isVisible={isModalVisible}
        useNativeDriver
        onBackdropPress={handleCloseModal}
        style={styles.modal}
      >
        <Text style={{ ...styles.modalTitleLabel, fontSize: hp(4) }}> Enter recipe name </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={{ ...styles.modalTextInput, width: wp(66), fontSize: hp(4) }}
          maxLength={50}
        />
      </Modal>
      <View style={{ ...styles.headerContainer, ...{ paddingHorizontal: wp(7) } }}>
        <Text style={{ ...styles.title, fontSize: hp(5), padding: wp(2) }}>{title}</Text>
        <Icon
          name="md-create"
          type="ionicon"
          size={wp(7)}
          color="white"
          onPress={handleOpenModal}
          underlayColor={Colors.background}
        />
      </View>
      <ImagePick image={image} onSetImage={setImage} />
      <View style={{ ...styles.inputsContainer, ...{ marginTop: hp(4) } }}>
        <DurationSlider value={duration} onValueChange={setDuration} />
        <DifficultySlider value={difficulty} onValueChange={setDifficulty} />
        <CaloriesSlider value={calories} onValueChange={setCalories} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'raleway-regular',
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitleLabel: {
    color: 'white',
    fontFamily: 'raleway-regular',
  },
  modalTextInput: {
    backgroundColor: 'white',
    fontFamily: 'raleway-regular',
    paddingVertical: 5,
    marginVertical: 5,
    textAlign: 'center',
  },
  inputsContainer: {
    alignSelf: 'flex-start',
    width: '100%',
  },
  label: {
    fontFamily: 'raleway-regular',
    color: 'white',
  },
});

export default EditRecipeScreen;
