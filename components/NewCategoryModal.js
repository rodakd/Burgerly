import React, { useState, createRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker';
import PropTypes from 'prop-types';
import Input from './Input';
import Colors from '../constants/Colors';

const NewCategoryModal = (props) => {
  const [pickedColor, setPickedColor] = useState(Colors.tertiary);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { width, height } = Dimensions.get('window');
  const ref = createRef();

  const handleClose = () => {
    setName('');
    setError('');
    setPickedColor(Colors.tertiary);
    props.onBackdropPress();
  };

  const handleSubmit = () => {
    if (name.length === 0) {
      setError('Please enter the name');
      ref.current.focus();
    } else {
      props.onSubmit(name, pickedColor);
      handleClose();
    }
  };

  return (
    <Modal
      style={styles.modal}
      useNativeDriver
      {...props}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
    >
      <View
        style={{
          ...styles.card,
          ...{
            width: width / 1.3,
            height: height / 1.5,
          },
        }}
      >
        <Text style={styles.cardHeader}> New category </Text>
        <Input
          ref={ref}
          containerStyle={{ alignSelf: 'flex-start' }}
          onChangeText={(value) => {
            setName(value);
          }}
          value={name}
          errorMessage={error}
        />
        <TriangleColorPicker
          color={pickedColor}
          defaultColor={Colors.tertiary}
          onColorChange={(color) => setPickedColor(fromHsv(color))}
          style={{
            width: width / 2,
            height: height / 3,
          }}
        />
        <Button
          containerStyle={styles.buttonContainer}
          title="Add category"
          type="solid"
          size={30}
          onPress={handleSubmit}
        />
      </View>
    </Modal>
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
    borderRadius: 20,
    alignItems: 'center',
    padding: 10,
  },
  cardHeader: {
    fontSize: 24,
  },
  buttonContainer: {
    margin: 20,
  },
});

NewCategoryModal.propTypes = {
  isVisible: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

NewCategoryModal.defaultProps = {
  isVisible: false,
  onBackdropPress: null,
};

export default NewCategoryModal;
