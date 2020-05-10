import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';

const ImageWithOverlay = (props) => {
  const { image, text, containerStyle } = props;
  return (
    <View style={containerStyle}>
      <ImageBackground style={styles.imageBackground} source={{ uri: image }} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.darker}>
            <Text style={styles.text}> {text} </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  overlay: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: wp(100),
    height: hp(40),
  },
  imageBackground: {
    width: wp(100),
    height: hp(40),
  },
  text: {
    fontFamily: 'lato-bold',
    textAlign: 'center',
    fontSize: hp(3),
    color: Colors.secondary,
  },
  darker: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: hp(1),
    width: wp(100),
  },
});

ImageWithOverlay.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string,
  containerStyle: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

ImageWithOverlay.defaultProps = {
  text: '',
  containerStyle: {},
};

export default ImageWithOverlay;
