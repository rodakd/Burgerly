import React from 'react';
import { View, ImageBackground, StyleSheet, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

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
        imageStyle={styles.rounded}
        source={image === null ? require('../assets/icon.png') : { uri: image }}
      >
        <IconButton
          onPress={pickImage}
          buttonStyle={{ ...styles.imageOverlay, ...styles.rounded }}
          touchableStyle={{ ...styles.imageOverlay, ...styles.rounded }}
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
    borderRadius: wp(50),
    width: wp(23),
    height: wp(23),
  },
  imageOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: wp(23),
    height: wp(23),
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rounded: {
    borderRadius: wp(50),
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
