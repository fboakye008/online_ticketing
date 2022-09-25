import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../contents';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Separator from '../components/WelcomeCard/Separator';
import { Display } from './utils';
import TextField from '../components/CustomInput/TextInput';

const SignUpScreen = ({ navigation }) => {
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text style={styles.headerTitle}>Create Account</Text>
      <Text style={styles.content}>
        Enter your Email, choose a username and password.
      </Text>
      <TextField placeholder={`Username`} icon={`user`} />
      <Separator height={15} />
      <TextField placeholder={`Email`} icon={`mail`} />
      <Separator height={15} />
      <TextField
        name="password"
        placeholder={`Password`}
        icon={`lock`}
        isPasswordShow={isPasswordShow}
        isPassword={true}
        setPasswordShow={setPasswordShow}
      />
      <Separator height={15} />
      <TextField
        name="confirmPassword"
        placeholder={`Confirm Password`}
        icon={`lock`}
        isPasswordShow={isConfirmPasswordShow}
        isPassword={true}
        setPasswordShow={setConfirmPasswordShow}
      />
      <Separator height={15} />
      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => navigation.navigate('RegisterPhone')}
      >
        <Text style={styles.signinButtonText}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.accountText}>Already have an account?</Text>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate('Signin')}
        >
          Sign In
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text style={styles.accountText}>
          By signing up, you confirm that you accept our {''}
          <Text
            style={styles.signupText}
            onPress={() => navigation.navigate(onTermsOfUsePressed)}
          >
            Terms of Use {''}
          </Text>
          and {''}
          <Text
            style={styles.signupText}
            onPress={() => navigation.navigate(onPrivacyPressed)}
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
    </SafeAreaView>
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
    paddingVertical: 10,
    paddingBottom: 15,
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
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default SignUpScreen;
