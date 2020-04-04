import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';

const IoniconsHeaderButton = (passMeFurther) => {
  return (
    <HeaderButton
      {...passMeFurther}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'ios' ? Colors.primary : Colors.secondary}
    />
  );
};

export default IoniconsHeaderButton;
