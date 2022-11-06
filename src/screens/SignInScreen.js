import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, SafeAreaView, Pressable} from 'react-native';
import Separator from '../components/WelcomeCard/Separator';
import {Colors, image as MyImage} from '../contents';
import TextField from '../components/CustomInput/TextInput';
import {Display} from './utils';
import {MaterialIcons} from '@expo/vector-icons';
import LoginUser from "../apis/login";
import LoadingScreen from "./utils/LoadingScreen";
import projectlogo from "../assets/images/projectLogo.png";
import SubmitButton from '../components/CustomInput/SubmitButton';
import {isValidObjField, updateError, isValidPhone} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInScreen = ({navigation, route}) => {
    let nextPage = route?.params?.navPage;
    if(!nextPage){
        nextPage = "Home";
    }
    const [loading, setLoading] = useState(false);
    useEffect(() => {

    }, []);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPasswordShow, setPasswordShow] = useState(false);

    const [userInfo, setUserInfo] = useState({
        phone: "",
        password: "",

    });

    const [error, setError] = useState("");

    const {phone, password} = userInfo;

    const handleOnChangeText = (value, fieldName) => {
        setUserInfo({...userInfo, [fieldName]: value});
    };

    const keyPressRef = React.useRef(null);

    const isValidForm = () => {
        //We will accept only if all of the fielsa have value
        if (!isValidObjField(userInfo))
            return updateError("Required all fields!", setError);
        // Phone number must have 9 digits
        if (!isValidPhone(phone))
            return updateError("Phone number is required and must be 10 digits!", setError);
        // password must have 8 or more characters
        if (!password.trim())
            return updateError("Password is required!", setError);
        return true;
    };

    const submitForm = async () => {
        if (isValidForm()) {
            try {
                setLoading(true);
                let user = await LoginUser(userInfo);
                if (user && user.phone) {
                    setLoading(false);
                    const payload = {
                        date_created: user.date_created,
                        last_modified: user.last_modified,
                        phone: user.phone, full_name: user.full_name,
                        email: user.email, api_key: user.api_key
                    };
                    await AsyncStorage.setItem("user", JSON.stringify(payload))
                    navigation.navigate(`${nextPage}`);
                } else {
                    return updateError("Password/phone number does not exist!", setError);
                }
            } catch (e) {
                return updateError(e.toString(), setError);
            } finally {
                setLoading(false);
            }
        }
    };


    return (

        <SafeAreaView>
         <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <View style={styles.header}>
            <Pressable
                onPress={() => navigation.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={30} color="#000"/>
            </Pressable>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Welcome!</Text>
                </View>
                </View>
            {error ? (
                <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                    {error}
                </Text>
            ) : null}

            <View style={styles.contentContainer}>
                <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>

                <TextField
                    value={phone}
                    onChangeText={(value) => handleOnChangeText(value, "phone")}
                    label={`Phone Number`}
                    placeholder={`Enter 10 digit Phone Number`}
                    icon={`phone`}
                    selectionColor={Colors.DEFAULT_GREEN}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                />
                <TextField
                    value={password}
                    onChangeText={(value) => handleOnChangeText(value, "password")}
                    autoCapitalize="none"
                    secureTextEntry={isPasswordShow ? false : true}
                    label={`Password`}
                    name="password"
                    placeholder={`Enter Password`}
                    icon={`lock`}
                    isPasswordShow={isPasswordShow}
                    isPassword={true}
                    setPasswordShow={setPasswordShow}
                />
                <Text></Text>
                <View style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('ForgotPassword')}>Forgot
                        Password</Text>
                </View>

                <SubmitButton
                    onPress={submitForm}
                    title="Sign In"
                />
                <View style={styles.signupContainer}>
                    <Text style={styles.accountText}>Don't have an account?</Text>
                    <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
                </View>

            </View>
            {loading && <LoadingScreen/>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    header: {
        borderBottomColor: '#eee',
        borderBottomWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        paddingHorizontal: 12,
        marginTop: 25,
        backgroundColor: Colors.DEFAULT_WHITE,
    },

    content: {
        colors: Colors.LIGHT_GREY,
        fontSize: 15,
        marginVertical: 15,
        marginLeft: 10,
    },
    contentContainer: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },

    forgotPasswordContainer: {
        marginHorizontal: 20,
        alignItems: 'center',
    },
    forgotPasswordText: {
        fontSize: 18,
        lineHeight: 20 * 1.4,
        color: Colors.DEFAULT_GREEN,
    },
    signupContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    accountText: {
        fontSize: 16,
        lineHeight: 13 * 1.4,
    },
    signupText: {
        color: Colors.DEFAULT_GREEN,
        fontSize: 16,
        lineHeight: 13 * 1.4,
        marginLeft: 5,
    },
    orText: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 15,
        lineHeight: 15 * 1.4,
        marginLeft: 5,
        alignSelf: 'center',
    },
    facebookButton: {
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
    signinButtonLogo: {
        height: 15,
        width: 25,
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
        lineHeight: 13 * 1.4,
    },
    topicsContainer: {
        flexDirection: "row",
        marginVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.DEFAULT_GREY,
        borderTopWidth: 1,
        borderTopColor: Colors.DEFAULT_GREY,
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 50,
        paddingHorizontal: 30,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.121,
        shadowRadius: 9.11,
        elevation: 5,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        marginLeft: -38,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    Image: {

        height: 100,
        width: 100,
        marginLeft: "35%"
    },
});

export default SignInScreen;
