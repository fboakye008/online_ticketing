import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../contents';
import { Display } from '../../screens/utils';

const TextField = ({ placeholder }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputSubContainer}>
        <Feather
          name="user"
          size={22}
          color={Colors.DEFAULT_GREY}
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Username"
          placeholderTextColor={Colors.DEFAULT_GREY}
          SelectionColor={Colors.DEFAULT_GREY}
          style={styles.inputText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: '',
  },
  title: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
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
  signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
  signupContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountText: {
    fontSize: 15,
    lineHeight: 13 * 1.4,
  },
  signupText: {
    color: Colors.DEFAULT_GREEN,
    fontSize: 15,
    lineHeight: 13 * 1.4,
    marginLeft: 5,
  },
});

export default TextField;
