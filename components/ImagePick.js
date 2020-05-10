import React from 'react';
import { View, ImageBackground, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import IconButton from './common/IconButton';

const ImagePick = (props) => {
  const { image, onSetImage } = props;

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    return status === 'granted';
  };

  const pickImage = async () => {
    if (getPermissionAsync) {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.5,
        });
        if (!result.cancelled) {
          onSetImage(result.uri);
        }
      } catch (err) {
        Alert.alert('You rejected permissions', 'Sorry, we need them to make it work!', [
          { text: 'Okay' },
        ]);
      }
    }
  };

  return (
    <View style={styles.imagePickerContainer}>
      <ImageBackground
        style={styles.imageBackground}
        source={image === null ? require('../assets/icon.png') : { uri: image }}
        resizeMode="cover"
      >
        <IconButton
          onPress={pickImage}
          buttonStyle={styles.imageOverlay}
          touchableStyle={styles.imageOverlay}
          iconName="md-create"
          iconSize={wp(10)}
          noRipple
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: hp(30),
  },
  imageOverlay: {
    height: hp(100),
    width: wp(100),
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

ImagePick.propTypes = {
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSetImage: PropTypes.func.isRequired,
};

ImagePick.defaultProps = {
  image: null,
};

export default ImagePick;
