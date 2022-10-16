import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Colors} from "../../contents";
import {AntDesign} from "@expo/vector-icons";
import {Dropdown} from 'react-native-element-dropdown';

const {width} = Dimensions.get("window");

const BookingTextField = ({placeholder, data, numOfPassenger, sendDataToParent,label}) => {
    const [numOfPassengers, setNumOfPassengers] = useState(1);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    return (
        <View style={styles.FieldContainer}>
            {/*<Text style={styles.label}>{label}:</Text>*/}
            {numOfPassenger ? (

                <TouchableOpacity style={styles.inputField}>
                    <Text>{numOfPassengers}</Text>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                if (numOfPassengers > 1) {
                                    const x = numOfPassengers - 1;
                                    setNumOfPassengers(x);
                                    sendDataToParent({numOfPassengers: x});
                                }
                            }}
                        >
                            <AntDesign name="minus" size={24} color="black"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                const x = numOfPassengers + 1;
                                setNumOfPassengers(x)
                                sendDataToParent({numOfPassengers: x});
                            }}
                        >
                            <MaterialIcons
                                name="add"
                                size={20}
                                color={Colors.DEFAULT_BLACK}
                            />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity>
                    <Dropdown
                        statusBarIsTranslucent={true}
                        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={placeholder}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setValue(item.value);
                            if(placeholder === "Bus Stop"){
                                sendDataToParent({numOfPassengers: numOfPassengers,busStop: item.value});
                            }
                            if(placeholder === "Time"){
                                sendDataToParent({numOfPassengers: numOfPassengers,time: item.value});
                            }
                            if(placeholder === "Route"){
                                sendDataToParent(item);
                            }
                            setIsFocus(false);
                        }}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    FieldContainer: {
        width: width - 40,
        marginVertical: 10,
    },
    label: {
        color: Colors.DEFAULT_BLACK,
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        paddingLeft: 10,
    },
    inputField: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: Colors.SECONDARY_WHITE,
        width: "100%",
        height: 50,
        borderRadius: 50,
        shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.121,
        shadowRadius: 9.11,
        elevation: 5,
    },
    btnContainer: {
        flexDirection: "row",
    },
    btn: {
        paddingHorizontal: 10,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 8,
        backgroundColor: Colors.SECONDARY_WHITE,
        shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.121,
        shadowRadius: 9.11,
        elevation: 5,
        
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default BookingTextField;
