import React, { useState, createRef, useEffect } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { ColorPicker, fromHsv, toHsv } from 'react-native-color-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

const EditCategoryModal = (props) => {
  const { onBackdropPress, onCreateNewItem, onEditItem, editedItem } = props;

  const [pickedColor, setPickedColor] = useState(toHsv(Colors.tertiary));
  const [name, setName] = useState('');
  const ref = createRef();

  useEffect(() => {
    if (editedItem) {
      setName(editedItem.title);
      setPickedColor(editedItem.color);
    }
  }, [editedItem]);

  const handleClose = () => {
    setName('');
    setPickedColor(toHsv(Colors.tertiary));
    onBackdropPress();
  };

  const handleSubmit = () => {
    if (name.length === 0) {
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
        <TextInput ref={ref} style={styles.input} onChangeText={setName} value={name} />
        <ColorPicker
          color={pickedColor}
          onColorChange={(color) => {
            Keyboard.dismiss();
            setPickedColor(color);
          }}
          style={styles.colorPicker}
        />
        <Button
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
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
    height: hp(30),
  },
  inputLabel: {
    fontFamily: 'lato-bold',
    fontSize: hp(1.7),
  },
  input: {
    paddingLeft: 4,
    fontSize: hp(3),
    fontFamily: 'lato-regular',
    backgroundColor: Colors.inputBackground,
    width: wp(60),
    height: hp(5),
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    textAlign: 'center',
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
