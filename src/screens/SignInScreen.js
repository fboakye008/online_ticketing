import React,{useState}  from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, TextInput, inputText } from 'react-native';
import Separator from '../components/WelcomeCard/Separator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import {Colors, image as MyImage} from '../contents';
import { Display } from './utils';


const SignInScreen = ({navigation}) => {
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
    <Text style={styles.headerTitle}>Sign In</Text>
    </View>
    <Text style={styles.title}>Welcome!</Text>
    <Text style={styles.content}>Enter your Username and password, and enjoy your trip!</Text>
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
          onPress={() => setPasswordShow(!isPasswordShow)}
        />
      </View>
    </View>
    <Text></Text>
    <View style={styles.forgotPasswordContainer}>
      <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password</Text>
    </View>
    <TouchableOpacity style={styles.signinButton}>
      <Text style={styles.signinButtonText} onPress={() => navigation.navigate('Home')}>Sign In</Text>
    </TouchableOpacity>
    <View style={styles.signupContainer}>
      <Text style={styles.accountText}>Don't have an account?</Text>
      <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
    </View>
    <Text style={styles.orText}>OR</Text>
    <TouchableOpacity style={styles.facebookButton}>
      <View style={styles.socialButtonContainer}>
        <View style={styles.signinButtonLogo}>
          <Image source={MyImage.facebook} style={styles.signinButtonLogo}/>
        </View>
        <Text style={styles.socialSigninButtonText}>Connect with Facebook</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.googleButton}>
      <View style={styles.socialButtonContainer}>
        <View style={styles.signinButtonLogo}>
          <Image source={MyImage.google} style={styles.signinButtonLogo}/>
        </View>
        <Text style={styles.socialSigninButtonText}>Connect with Google</Text>
      </View>
    </TouchableOpacity>
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
  headerTitle:{
    fontSize: 20,
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
  forgotPasswordContainer:{
     marginHorizontal: 20,
     alignItems: 'center',
  },
  forgotPasswordText:{
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_GREEN,
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
// accountText:{
//   backgroundColor: Colors.DEFAULT_GREY,
//   fontSize: 13,
//   lineHeight: 13*1.4,
// },
signupText:{
  color: Colors.DEFAULT_GREEN,
  fontSize: 13,
  lineHeight: 13*1.4,
  marginLeft: 5,
},
orText: {
  color: Colors.DEFAULT_BLACK,
  fontSize: 15,
  lineHeight: 15*1.4,
  marginLeft: 5,
  alignSelf: 'center',
},
facebookButton:{
  backgroundColor: Colors.FACEBOOK_BLUE,
  paddingVertical: 15,
  marginHorizontal: 20,
  borderRadius: 8,
  marginVertical: 20,
  justifyContent: 'center',
  alignItems: 'center',
},
googleButton: {
  backgroundColor: Colors.FACEBOOK_BLUE,
  paddingVertical: 15,
  marginHorizontal: 20,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
},
signinButtonLogo:{
  height: 15,
  width:15,
},
signinButtonContainer: {
 backgroundColor: Colors.DEFAULT_WHITE,
 padding: 2,
 borderRadius: 3,
 position: 'absolute',
 left: 25,
},
socialButtonContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
},
socialSigninButtonText: {
   color: Colors.DEFAULT_WHITE,
   fontSize: 13,
   lineHeight: 13*1.4,
},
});

export default SignInScreen;