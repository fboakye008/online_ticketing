import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AntDesign} from "@expo/vector-icons";

const DisplayTrip = ({title, onPress}) => {
    return (
        <View style={styles.row}>
            <View style={styles.iconContainer}>
                <AntDesign
                    name="clockcircle"
                    size={10}
                    color={"#ffffff"}
                ></AntDesign>
            </View>
            <TouchableOpacity
                onPress={onPress}
                style={styles.signinButton}
                activeOpacity={0.8}
            >
                <Text style={styles.destinationText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderColor: "#dbdbdb",
    },
    iconContainer: {
        backgroundColor: "#b3b3b3",
        padding: 10,
        borderRadius: 25,
    },
    destinationText: {
        marginLeft: 10,
        fontWeight: "500",
        fontSize: 15,
    },
});

export default DisplayTrip;