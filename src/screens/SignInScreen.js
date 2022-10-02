import React,{useState}  from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Separator from '../components/WelcomeCard/Separator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import {Colors, image as MyImage} from '../contents';
import TextField from '../components/CustomInput/TextInput';
import { Display } from './utils';
import SubmitButton from '../components/CustomInput/SubmitButton';


const SignInScreen = ({navigation}) => {
  const [fullName, onChangeFullName] = React.useState("");
const [isPasswordShow, setPasswordShow] = useState(false);

  return (
    
    <SafeAreaView style={styles.container}>
    <View style={styles.contentContainer}>
    <Separator height={10} />
      <Text style={styles.headerTitle}>Welcome!</Text>
      <Text style={styles.content}>
      Enter your Username and password, and enjoy your trip!
      </Text>
      <TextField 
      value = {fullName} 
      onChangeText={(value) => handleOnChangeText(value, 'fullName')}  
      label={`Full Name`} 
      placeholder={`Full Name`} 
      icon={`user`} 
      autoCapitalize='none'
 
      />
      <TextField
        name="password"
        label={`Password`} 
        placeholder={`Password`}
        icon={`lock`}
        secureTextEntry={isPasswordShow ? false : true}
        isPasswordShow={isPasswordShow}
        isPassword={true}
        setPasswordShow={setPasswordShow}
      />
    <Text></Text>
    <View style={styles.forgotPasswordContainer}>
      <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password</Text>
    </View>
    <SubmitButton   onPress={() => navigation.navigate('Home')}title='Sign In'/>
    {/* <TouchableOpacity style={styles.signinButton}>
      <Text style={styles.signinButtonText} onPress={() => navigation.navigate('Home')}>Sign In</Text>
    </TouchableOpacity> */}

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
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: Colors.DEFAULT_WHITE,
},
  headerTitle:{
    Colors: Colors.DEFAULT_BLACK,
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    height: 55,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    backgroundColor: Colors.Light,
    borderColor: Colors.LIGHT_GREEN,
    alignItems: 'center',
  },
  content:{
    colors: Colors.LIGHT_GREY,
    fontSize: 18,
    marginVertical: 15,
  },
  contentContainer:{
    paddingTop: 50,
    paddingHorizontal: 20, 
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
    fontSize: 18,
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_GREEN,
 },
//  signinButton:{
//    backgroundColor: Colors.DEFAULT_GREEN,
//    borderRadius: 5,
//    paddingHorizontal: 30,
//    height: Display.setHeight(6),
//    justifyContent: 'center',
//    alignItems: 'center',
//    marginTop: 20,
//  },
//  signinButtonText:{
//   color: Colors.DEFAULT_WHITE,
//   fontSize: 18,
//   lineHeight: 18*1.4,
// },
signupContainer:{
 marginHorizontal: 20,
 justifyContent: 'center',
 paddingVertical: 20,
 flexDirection:'row',
 alignItems: 'center',
},
accountText:{
  fontSize: 16,
  lineHeight: 13*1.4,
},
signupText:{
  color: Colors.DEFAULT_GREEN,
  fontSize: 16,
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
  backgroundColor: Colors.DEFAULT_FGCOLOR,
  fontSize: 16,
  paddingVertical: 15,
  paddingHorizontal: 30,
  borderRadius: 5,
  marginVertical: 20,
  justifyContent: 'center',
  alignItems: 'center',
},
googleButton: {
  backgroundColor: Colors.Donut_Pink,
  paddingVertical: 16,
  paddingHorizontal: 30,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
},
signinButtonLogo:{
  height: 15,
  width:25,
  
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
  width: '70%',
},
socialSigninButtonText: {
   color: Colors.DEFAULT_WHITE,
   fontSize: 15,
   lineHeight: 13*1.4,
},
});

export default SignInScreen;