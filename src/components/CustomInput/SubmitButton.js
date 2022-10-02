import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../contents';
import { Display } from '../../screens/utils';

const SubmitButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
        style={styles.signinButton}
        // onPress={() => navigation.navigate('RegisterPhone')}
        activeOpacity={0.8}
        // onPress={() => navigation.navigate('Verification', { phoneNumber })}
      >
        <Text style={styles.signinButtonText}>{title}</Text>
      </TouchableOpacity>
  )
}

const styles=StyleSheet.create({ 
signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 5,
    paddingHorizontal: 30,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  signinButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
});

export default SubmitButton;