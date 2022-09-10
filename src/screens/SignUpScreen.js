import React , {useState} from 'react'
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, inputText } from 'react-native';
import {Colors} from '../contents';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import Separator from '../components/WelcomeCard/Separator';
import { Display } from './utils';

const SignUpScreen = ({navigation}) => {

    const [isPasswordShow, setPasswordShow] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar  
      barStyle='dark-content'
      backgroundColor={Colors.DEFAULT_WHITE}
      translucent
      />
      <Separator height={StatusBar.currentHeight} />
    <View style={styles.headerContainer}>
    <Ionicons name='chevron-back-outline' 
    size={30} 
    onPress={() => navigation.goBack()}/>
    <Text style={styles.headerTitle}>Sign Up</Text>
    </View>
    <Text style={styles.title}>Create Account!</Text>
    <Text style={styles.content}>Enter your Email, choose a username and password.
    </Text>
    <View style={styles.inputContainer}>
      <View style={styles.inputSubContainer}>
        <Feather 
        name='user' 
        size={22} 
        color={Colors.DEFAULT_GREY}
        style={{marginRight: 10}}
        />
        <TextInput
         placeholder='Username' 
         placeholderTextColor={Colors.DEFAULT_GREY}
         SelectionColor={Colors.DEFAULT_GREY}
         style={inputText}
         />
      </View>
    </View>
    <Separator height={15}/>
    <View style={styles.inputContainer}>
      <View style={styles.inputSubContainer}>
        <Feather 
        name='mail' 
        size={22} 
        color={Colors.DEFAULT_GREY}
        style={{marginRight: 10}}
        />
        <TextInput
         placeholder='Email' 
         placeholderTextColor={Colors.DEFAULT_GREY}
         SelectionColor={Colors.DEFAULT_GREY}
         style={inputText}
         />
      </View>
    </View>
    <Separator height={15}/>
    <View style={styles.inputContainer}>
      <View style={styles.inputSubContainer}>
      <Feather
       name='lock'
       size={22} 
       color={Colors.DEFAULT_GREY}
       style={{marginRight: 10}}
         />
        <TextInput 
         secureTextEntry={isPasswordShow ? false : true}
         placeholder='Password' 
         placeholderTextColor={Colors.DEFAULT_GREY}
         SelectionColor={Colors.DEFAULT_GREY}
         style={inputText}
        />
        <Feather 
          name={isPasswordShow ? 'eye': 'eye-off'}
          size={22} 
          color={Colors.DEFAULT_GREY}
          style={{marginRight: 10}}
          onPress={() => setPasswordShow (!isPasswordShow)}
        />
      </View>
    </View>
    <View style={styles.inputContainer}>
      <View style={styles.inputSubContainer}>
      <Feather
       name='lock'
       size={22} 
       color={Colors.DEFAULT_GREY}
       style={{marginRight: 10}}
         />
        <TextInput 
         secureTextEntry={isPasswordShow ? false : true}
         placeholder='Confirm Password' 
         placeholderTextColor={Colors.DEFAULT_GREY}
         SelectionColor={Colors.DEFAULT_GREY}
         style={inputText}
        />
        <Feather 
          name={isPasswordShow ? 'eye': 'eye-off'}
          size={22} 
          color={Colors.DEFAULT_GREY}
          style={{marginRight: 10}}
          onPress={() => setPasswordShow (!isPasswordShow)}
        />
      </View>
    </View>
    <TouchableOpacity style={styles.signinButton} onPress={() => navigation.navigate('RegisterPhone')}>
      <Text style={styles.signinButtonText}>Create Account</Text>
    </TouchableOpacity>
    <View style={styles.signupContainer}>
      <Text style={styles.accountText}>Already have an account?</Text>
      <Text style={styles.signupText} onPress={() => navigation.navigate('Signin')}>Sign In</Text>
    </View>
    <View>

    <Text style={styles.accountText}>
          By signing up, you confirm that you accept our{""}
          <Text style={styles.signupText} onPress={() => navigation.navigate(onTermsOfUsePressed)}>
            Terms of Use
          </Text>
          and{""}
          <Text style={styles.signupText} onPress={() => navigation.navigate(onPrivacyPressed)}>
            Privacy Policy
          </Text>
        </Text>
    </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        },
        headerTitle:{
          fontSize: 30,
          lineHeight: 20*1.4,
          width: Display.setWidth(80),
          textAlign: 'center',
        },
        title:{
            fontSize: 20,
            lineHeight: 20*1.4,
            marginTop:50,
            marginBottom: 10,
            marginHorizontal: 20,
          },
          content:{
            fontSize: 20,
            marginTop: 10,
            marginBottom: 20,
            marginHorizontal: 20,
          },
          inputContainer:{
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
          signinButton:{
            backgroundColor: Colors.DEFAULT_GREEN,
            borderRadius: 8,
            marginHorizontal: 20,
            height: Display.setHeight(6),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          },
          signinButtonText:{
           color: Colors.DEFAULT_WHITE,
           fontSize: 18,
           lineHeight: 18*1.4,
         },
         signupContainer:{
            marginHorizontal: 20,
            justifyContent: 'center',
            paddingVertical: 20,
            flexDirection:'row',
            alignItems: 'center',
           },
           accountText:{
             fontSize: 15,
             lineHeight: 13*1.4,
           },
           signupText:{
             color: Colors.DEFAULT_GREEN,
             fontSize: 15,
             lineHeight: 13*1.4,
             marginLeft: 5,
           },
});

export default SignUpScreen;