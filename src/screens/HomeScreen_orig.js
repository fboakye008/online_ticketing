import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, SafeAreaView} from 'react-native';

import {Colors} from '../contents';
import {Display} from './utils';
import {
    MaterialIcons,
    AntDesign,
} from "@expo/vector-icons";

import utils from "../apis/utils";
import {updateError} from "../utils";
import HomeMap from "../components/HomeMap";
import {useFocusEffect} from '@react-navigation/native';


const HomeScreen = ({navigation}) => {
    const {map} =  require("../constants/imagePath")
    const [error, setError] = useState("");
    const keyPressRef = React.useRef(null);
    const [viewStaticMap, setViewStaticMap] = useState(true);

    const focusHandler = navigation.addListener('focus', () => {
        populateData().catch();
        return;
    });
    const populateData = async function() {
        try {
            const y = await utils.isLoggedIn();
            if (y) {
                //if y but no upcoming trips still show static image
                setViewStaticMap(false);
            } else {
                setViewStaticMap(true);
            }
            return focusHandler;
        } catch (ee) {
            setViewStaticMap(true);
            return updateError(ee.toString(), setError);
        }
    }
    useEffect(() => {
        populateData().catch();
    }, [navigation]);
    const handleSchedule = () => {
        navigation.navigate('MapScreen');
    };
    const handleMap = () => {
        navigation.navigate('MapScreen');
    };
    const handleBuyTicket = async () => {
        try {
            const y = await utils.isLoggedIn();
            let navPage = 'Route';
            if (y) {
                navigation.navigate(navPage);
            } else {
                navigation.navigate('Signin', {navPage});
            }
        } catch (ee) {
            console.log("Error", ee);
            return updateError(ee.toString(), setError);
        }
    };
    const handleTicketWallet = async () => {
        try {
            const y = await utils.isLoggedIn()
            let navPage = 'Wallet';
            if (y) {
                navigation.navigate(navPage);
            } else {
                navigation.navigate('Signin', {navPage});
            }
        } catch (ee) {
            console.log("Error", ee)
            return updateError(ee.toString(), setError);
        }
    };
    return (
        <SafeAreaView>

            <View style={styles.container}>
                <View>
                    {viewStaticMap ? (
                            <Image source={map} style={[styles.Image]} resizeMode="cover"/>
                        ) :
                        <HomeMap/>
                    }
                    <View style={styles.messageBox}>
                        <Text style={styles.title}> Travel only if necessary</Text>
                        <Text style={styles.text}>
                            We wish you safe travels, unforgettable experiences, and memories to last a lifetime.
                        </Text>
                    </View>


                    <TouchableOpacity
                        style={styles.topicsContainer}
                        onPress={() => handleBuyTicket()}
                        ref={keyPressRef}>
                        <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
                            <AntDesign name="bars" size={24} color="black"/>
                            <Text style={styles.topic}>Buy Ticket</Text>
                            <View>
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    size={26}
                                    color="black"
                                />
                            </View>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.topicsContainer}
                        onPress={() => handleTicketWallet()}
                        ref={keyPressRef}>
                        <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
                            <AntDesign name="wallet" size={24} color="black"/>
                            <Text style={styles.topic}>Ticket Wallet</Text>
                            <View>
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    size={30}
                                    color="black"
                                />
                            </View>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.topicsContainer}
                        onPress={() => handleSchedule()}
                        ref={keyPressRef}>
                        <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
                            <AntDesign name="clockcircleo" size={24} color="black"/>
                            <Text style={styles.topic}>Today's Schedule</Text>
                            <View>
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    size={26}
                                    color="black"
                                />
                            </View>
                        </View>

                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    container1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.DEFAULT_WHITE,
        marginBottom: 10,
    },
    text: {

        fontSize: 15,
        color: Colors.DEFAULT_WHITE,
        marginBottom: 10,
    },

    topic: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 5,
        fontWeight: "500",
    },

    mapContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 2,
        marginLeft: 1,
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.Light,
        paddingHorizontal: 10,
        height: Display.setHeight(10),
        marginTop: 2,
        marginBottom: 8,
        shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.121,
        shadowRadius: 9.14,
        elevation: 10,
    },
    messageBox: {

        width: '100%',
        backgroundColor: Colors.SECONDARY_BLACK,
        padding: 10,
        marginBottom: 2,
        paddingTop: 2,
        height: Display.setHeight(12),
        shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.121,
        shadowRadius: 9.11,
        elevation: 5,
    },

    topicsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 2,
        marginLeft: 1,
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.LIGHT_GREEN,
        paddingHorizontal: 10,
        height: Display.setHeight(8),
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
    Image: {
        backgroundColor: "#a0abff",
        justifyContent: 'center',
        alignItems: 'center',
        height: Display.setHeight(50),
        width: Display.setWidth(100),
    },
});

export default HomeScreen;
