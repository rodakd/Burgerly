import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import { IconButton } from '../components';

export const ADD_MODE = 'ADD_MODE';
export const EDIT_MODE = 'EDIT_MODE';

const EditRecipeScreen = (props) => {
  const { navigation, route } = props;

  const [title, setTitle] = useState('New recipe');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState(null);

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

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    if (getPermissionAsync) {
      try {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.5,
        });
        if (!result.cancelled) {
          setImage(result.uri);
        }
      } catch (err) {
        Alert.alert('You rejected permissions', 'Sorry, we need them to make it work!', [
          { text: 'Okay' },
        ]);
      }
    }
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
      <View
        style={{
          ...styles.imagePickerContainer,
          ...{ borderRadius: wp(50), width: wp(25), height: wp(25) },
        }}
      >
        {image ? (
          <ImageBackground
            style={{ width: wp(24), height: wp(24), borderRadius: wp(50) }}
            source={{ uri: image }}
          >
            <IconButton
              onPress={pickImage}
              buttonStyle={{ ...styles.imageOverlay, ...{ borderRadius: wp(25) } }}
              touchableStyle={{ ...styles.imageOverlay, ...{ borderRadius: wp(25) } }}
              iconName="md-create"
              iconSize={wp(10)}
              noRipple
            />
          </ImageBackground>
        ) : (
          <ImageBackground
            style={{
              width: wp(23),
              height: wp(23),
              borderRadius: wp(50),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../assets/icon.png')}
          >
            <IconButton
              onPress={pickImage}
              buttonStyle={{ ...styles.imageOverlay, ...{ borderRadius: wp(25) } }}
              touchableStyle={{ ...styles.imageOverlay, ...{ borderRadius: wp(25) } }}
              iconName="md-create"
              iconSize={wp(10)}
              noRipple
            />
          </ImageBackground>
        )}
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
  imagePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditRecipeScreen;
