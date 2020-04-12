import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
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

export const ADD_MODE = 'ADD_MODE';
export const EDIT_MODE = 'EDIT_MODE';

const EditRecipeScreen = ({ navigation, route }) => {
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
          <Image
            style={{ width: wp(24), height: wp(24), borderRadius: wp(50) }}
            source={{ uri: image }}
          />
        ) : (
          <Image
            style={{ width: wp(23), height: wp(23), borderRadius: wp(50) }}
            source={require('../assets/icon.png')}
          />
        )}
        <TouchableOpacity
          style={{ ...styles.imageOverlay, ...{ borderRadius: wp(25) } }}
          onPress={pickImage}
        >
          <View style={{ ...styles.imageOverlay, ...{ borderRadius: wp(25) } }}>
            <Icon type="ionicon" name="md-create" size={wp(10)} color="white" />
          </View>
        </TouchableOpacity>
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
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditRecipeScreen;
