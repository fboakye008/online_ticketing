import React, {useLayoutEffect, useMemo, useState} from "react";
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import {Colors} from "../contents";
import Separator from "../components/WelcomeCard/Separator";
import TextField from "../components/CustomInput/TextInput";
import SubmitButton from "../components/CustomInput/SubmitButton";
import CreateUser from "../apis/user";
import {MaterialIcons} from "@expo/vector-icons";
import projectlogo from "../assets/images/projectLogo.png";
import LoadingScreen from "./utils/LoadingScreen";
import {isValidObjField, updateError, isValidPhone, isValidEmail} from '../utils';
import utils from "../apis/utils";
import moment from "moment";

const SignUpScreen = ({navigation}) => {
     const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        email: "",
        phone: "",
        date_created: "",
        last_modified: "",
        api_key: ""
    });
    const [error, setError] = useState("");

    useMemo(() => {
        async function populateData() {
            try {
                const user = await utils.findCachedUser();
                if (user) {
                    setUserInfo({
                        fullName: user.full_name,
                        email: user.email,
                        phone: user.phone,
                        api_key: user.api_key,
                        date_created: moment(user.date_created).format('MMMM Do YYYY, h:mm a'),
                        last_modified: moment(user.last_modified).format('MMMM Do YYYY, h:mm a')
                    });
                } else {
                    const navPage = 'Settings';
                    navigation.navigate('Signin', {navPage});
                }
                return "done"
            } catch (err) {
                console.log(err);
                console.log("Something went wrong")
                return updateError(err.toString(), setError);
            }
        }
<<<<<<< HEAD
        return "done"
      } catch (err) {
        console.log(err);
        console.log("Something went wrong")
        return updateError(err.toString(), setError);
      }
    }
    populateData().catch();
  }, []);
  return (
    <SafeAreaView >
       <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />

      <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate('Account')}>
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
                 <Text style={styles.Headertopic}>Personal Info </Text>
           <View>
               <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
          </View>
        </TouchableOpacity>
        {error ? (
        <Text style={{ color: Colors.Red, fontSize: 12, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
        <ScrollView
         contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={styles.contentContainer}
      >
        <TextField
          value={fullName}
          label={`Full Name`}
          placeholder={fullName}
          icon={`user`}
          autoCapitalize="none"
        />
        <TextField
          value={email}
          label={`Email`}
          placeholder={email}
          icon={`mail`}
          autoCapitalize="none"
        />
        <TextField
          value={phone}
          label={`Phone Number`}
          placeholder={phone}
          icon={`phone`}
          selectionColor={Colors.DEFAULT_GREEN}
          keyboardType="number-pad"
          autoCapitalize="none"
        />
        <Separator height={10} />
        <SubmitButton
          onPress={submitForm}
          title="Save"
        />
        <View style={styles.signupContainer}>
          <Text style={styles.accountText}>Delete account</Text>
        </View>
=======
>>>>>>> b02e4def34cf531b97c94b0a1853c7853e0f3730

        populateData().catch();
    }, []);
    return (
        <SafeAreaView>
            <TouchableOpacity
                style={styles.header}
                onPress={() => navigation.navigate('Account')}>
                <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
                    <MaterialIcons name="keyboard-arrow-left" size={30} color="#000"/>
                    <Text style={styles.headerTopic}>Personal Info </Text>
                    <View>
                        <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>
                    </View>
                </View>
            </TouchableOpacity>
            {error ? (
                <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                    {error}
                </Text>
            ) : null}
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled"
                style={styles.contentContainer}
            >
                <TextField
                    value={userInfo.fullName}
                    editable={false}
                    label={`Full Name`}
                    icon={`user`}
                    autoCapitalize="none"
                />
                <TextField value={userInfo.email}
                           editable={false}
                           label={`Email`}
                           icon={`mail`}
                           autoCapitalize="none"
                />
                <TextField
                    value={userInfo.phone}
                    editable={false}
                    label={`Phone Number`}
                    icon={`phone`}
                    selectionColor={Colors.DEFAULT_GREEN}
                    autoCapitalize="none"
                />
                <Separator height={10}/>
                <Separator height={10}/>
                <Text style={[styles.accountText,{fontWeight: "bold",color:Colors.Black}]}>API Key : {userInfo.api_key} </Text>
                <Separator height={10}/>
                <Separator height={10}/>
                <Text style={[styles.accountText,{fontWeight: "bold",color:Colors.Black}]}>Created : {userInfo.date_created} </Text>
                <Separator height={10}/>
                <Separator height={10}/>
                <Text style={[styles.accountText,{fontWeight: "bold",color:Colors.Black}]}>Modified : {userInfo.last_modified} </Text>
            </ScrollView>
            {loading && <LoadingScreen/>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,

    },
    contentContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    signupContainer: {
        marginHorizontal: 20,
        justifyContent: "center",
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    accountText: {
        fontSize: 16,
        lineHeight: 13 * 1.4,
        color: Colors.Red,
    },

<<<<<<< HEAD
  header:{
    borderBottomColor: '#eee',
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    marginLeft: 1,
    paddingTop: 25,
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
=======
    header: {
        borderBottomColor: '#eee',
        justifyContent: "space-between",
        width: "100%",
        borderBottomWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        marginLeft: 1,
        paddingTop: 12,
        paddingHorizontal: 12,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    headerTopic: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: "bold",
    },
    Image: {
>>>>>>> b02e4def34cf531b97c94b0a1853c7853e0f3730

        height: 30,
        width: 30,
        marginRight: 20,
    },

});

export default SignUpScreen;
