import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import Separator from '../components/WelcomeCard/Separator';
import SubmitButton from '../components/CustomInput/SubmitButton';
import TextField from '../components/CustomInput/TextInput';
import {Colors} from '../contents';
import {RequestNewPassword} from "../apis/reset";
import LoadingScreen from "./utils/LoadingScreen";
import {updateError,isValidEmail} from "../utils";
import projectlogo from "../assets/images/projectLogo.png";
import {MaterialIcons} from "@expo/vector-icons";

/**
 *
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
const ForgotPasswordScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const fromScreen = "ForgotPassword";
    const handleOnChangeText = (value) => {
        setEmail(value);
    };
    const isValidForm = () => {
        if (!isValidEmail(email)) {
            return updateError("Enter a valid email!", setError);
        }
        return true;
    };
    const submitForm = async () => {
        try {
            if (isValidForm()) {
                setLoading(true);
                const result = await RequestNewPassword(email);
                if (result.success === "success") {
                    navigation.replace("Verification", {email,fromScreen});
                } else {
                    throw "Email not found";
                }
            }
        } catch (ee) {
            return updateError(ee, setError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
           
        <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.goBack()}>
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
                 <Text style={styles.Headertopic}>Make Payment </Text>
           <View>
               <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
          </View>
        </TouchableOpacity>
            <View style={styles.contentContainer}>
            {error ? (
                <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                    {error}
                </Text>
            ) : null}
                <Text style={styles.content}>
                    Enter your email to help you recover your password
                </Text>
                <TextField
                    value={email}
                    onChangeText={(value) => handleOnChangeText(value)}
                    label={`Email`}
                    placeholder={`Example@gmail.com`}
                    icon={`mail`}
                    autoCapitalize='none'

                />
                <Separator height={10}/>
                <SubmitButton
                    onPress={submitForm}
                    title="Reset Password"
                />

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
    content: {
        colors: Colors.LIGHT_GREY,
        fontSize: 18,
        marginVertical: 15,
    },
    contentContainer: {
        paddingTop: 5,
        paddingHorizontal: 20,
    },
    header:{
        borderBottomColor: '#eee',
        justifyContent: "space-between",
        width: "100%",
        borderBottomWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        marginLeft: 1,
        marginTop: 12,
        paddingHorizontal: 12,
        backgroundColor: Colors.DEFAULT_WHITE,
      },
      Headertopic: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: "bold",
    },
      Image: {

        height: 30,
        width: 30,
        marginRight: 20,
    },


});
export default ForgotPasswordScreen;