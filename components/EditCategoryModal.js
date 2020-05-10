import React, { useState, createRef, useEffect } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { TriangleColorPicker, fromHsv, toHsv } from 'react-native-color-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import Input from './common/Input';
import Colors from '../constants/Colors';

const EditCategoryModal = (props) => {
  const { onBackdropPress, onCreateNewItem, onEditItem, editedItem } = props;

  const [pickedColor, setPickedColor] = useState(toHsv(Colors.tertiary));
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const ref = createRef();

  useEffect(() => {
    if (editedItem) {
      setName(editedItem.title);
      setPickedColor(editedItem.color);
    }
  }, [editedItem]);

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
    } else if (editedItem) {
      onEditItem(editedItem.id, name, fromHsv(pickedColor));
      handleClose();
    } else {
      onCreateNewItem(name, fromHsv(pickedColor));
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
      <View style={styles.card}>
        <Text style={styles.cardHeader}>{editedItem ? 'Editing category' : 'New category'}</Text>
        <Input
          ref={ref}
          containerStyle={{ alignSelf: 'flex-start' }}
          textInputStyle={styles.textInputStyle}
          label="Category name"
          labelStyle={styles.inputLabel}
          onChangeText={(value) => {
            setName(value);
          }}
          value={name}
          errorMessage={error}
          maxLength={20}
        />
        <TriangleColorPicker
          color={pickedColor}
          onColorChange={(color) => {
            Keyboard.dismiss();
            setPickedColor(color);
          }}
          style={styles.colorPicker}
        />
        <Button
          titleStyle={styles.buttonTitle}
          title="Submit"
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
    backgroundColor: Colors.secondary,
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
    justifyContent: 'space-around',
    padding: wp(2),
    width: wp(75),
    height: wp(100),
  },
  buttonContainer: {
    marginTop: 10,
  },
  cardHeader: {
    fontFamily: 'lato-regular',
    fontSize: hp(4),
  },
  buttonTitle: {
    fontSize: hp(3),
    fontFamily: 'lato-bold',
    padding: 10,
  },
  colorPicker: {
    width: wp(50),
    height: wp(50),
  },
  inputLabel: {
    fontFamily: 'lato-bold',
    fontSize: hp(1.7),
  },
  textInputStyle: {
    paddingVertical: 7,
    paddingLeft: 4,
    fontSize: hp(3),
    fontFamily: 'lato-regular',
  },
});

EditCategoryModal.propTypes = {
  isVisible: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  onCreateNewItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
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
