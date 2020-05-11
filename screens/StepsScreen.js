import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

const StepsScreen = (props) => {
  const { navigation, route } = props;
  const { steps } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Steps',
    });
  }, [navigation]);

  return (
    <Swiper dotColor={Colors.secondary} activeDotColor={Colors.tertiary}>
      {steps.map((step, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <ScrollView key={index + 1} contentContainerStyle={styles.slide}>
            <View style={styles.textContainer}>
              <Text style={styles.stepNumber}> Step {index + 1} </Text>
              <Text style={styles.description}> {step.text} </Text>
            </View>
          </ScrollView>
        );
      })}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },

  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },

  textContainer: {
    alignItems: 'center',
    width: wp(90),
  },

  stepNumber: {
    fontSize: hp(5),
    fontFamily: 'lato-bold',
    color: Colors.secondary,
  },

  description: {
    fontSize: hp(3),
    textAlign: 'center',
    fontFamily: 'lato-regular',
    color: Colors.secondary,
    marginTop: hp(1),
  },
});

export default StepsScreen;
