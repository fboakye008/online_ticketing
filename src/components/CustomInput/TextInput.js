import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../contents';
import { Display } from '../../screens/utils';

const TextField = ({
  placeholder,
  isPassword,
  icon,
  setPasswordShow,
  isPasswordShow,
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputSubContainer}>
        <Feather
          name={icon}
          size={22}
          color={Colors.DEFAULT_GREY}
          style={{ marginRight: 10 }}
        />
        <TextInput
          secureTextEntry={isPasswordShow ? false : true}
          placeholder={placeholder}
          placeholderTextColor={Colors.DEFAULT_GREY}
          SelectionColor={Colors.DEFAULT_GREY}
          style={styles.inputText}
        />
        <TouchableOpacity onPress={() => setPasswordShow(!isPasswordShow)}>
          {isPassword ? (
            <Feather
              name={isPasswordShow ? 'eye' : 'eye-off'}
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY2,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_GREY,
    justifyContent: 'center',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
});

export default TextField;
