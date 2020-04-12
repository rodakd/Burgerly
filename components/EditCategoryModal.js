import React, { useState, createRef } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { TriangleColorPicker, fromHsv, toHsv } from 'react-native-color-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import Input from './Input';
import Colors from '../constants/Colors';

const EditCategoryModal = (props) => {
  const { onBackdropPress, onSubmit, editedItem } = props;

  const [pickedColor, setPickedColor] = useState(toHsv(Colors.tertiary));
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const ref = createRef();

  const handleClose = () => {
    setName('');
    setError('');
    setPickedColor(toHsv(Colors.tertiary));
    onBackdropPress();
  };

  const handleSubmit = () => {
    if (name.length === 0) {
      setError('Please enter the name');
      ref.current.focus();
    } else if (name.length > 20) {
      setError('Maximum name length is 20 characters.');
      ref.current.focus();
    } else {
      onSubmit(name, fromHsv(pickedColor));
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
            width: wp(50),
            height: wp(75),
          },
        }}
      >
        <Text style={{ ...styles.cardHeader, ...{ fontSize: hp(4) } }}>
          {editedItem ? 'Editing category' : 'New category'}
        </Text>
        <Input
          ref={ref}
          containerStyle={{ alignSelf: 'flex-start' }}
          textInputStyle={{ paddingVertical: 7, paddingLeft: 4, fontSize: hp(3) }}
          label="Category name"
          onChangeText={(value) => {
            setName(value);
          }}
          value={name}
          errorMessage={error}
        />
        <TriangleColorPicker
          color={pickedColor}
          onColorChange={(color) => {
            Keyboard.dismiss();
            setPickedColor(color);
          }}
          style={{
            width: wp(37),
            height: wp(37),
          }}
        />
        <Button
          containerStyle={{ ...styles.buttonContainer, ...{ width: wp(30) } }}
          titleStyle={{ fontSize: hp(3), fontFamily: 'raleway-bold' }}
          title="Add category"
          type="outline"
          size={wp(50)}
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
    justifyContent: 'space-between',
    padding: wp(2),
  },
  buttonContainer: {
    marginTop: 10,
  },
  cardHeader: {
    fontFamily: 'raleway-regular',
  },
});

EditCategoryModal.propTypes = {
  isVisible: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  editedItem: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    color: PropTypes.string,
  }),
};

EditCategoryModal.defaultProps = {
  isVisible: false,
  onBackdropPress: null,
  editedItem: null,
};

export default EditCategoryModal;
