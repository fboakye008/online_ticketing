import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { Colors } from "../../contents";


const SearchBar = (props) => {
    return (
        <View style={styles.container}>
            <View
                style={
                    !props.clicked
                        ? styles.searchBar__unclicked
                        : styles.searchBar__clicked
                }
            >
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={props.searchPhrase}
                    onChangeText={props.setSearchPhrase}
                    onFocus={() => {
                        props.setClicked(true);
                    }}
                />

                {props.clicked && (
                    <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                        props.setSearchPhrase("")
                    }}/>
                )}
            </View>
            {props.clicked && (
                <View >
                    <Button
                        title="Cancel"
                        onPress={() => {
                            Keyboard.dismiss();
                            props.setClicked(false);
                        }}
                    ></Button>
                </View>
            )}
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    Button:{
        backgroundColor: Colors.DEFAULT_GREEN,
    },
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",

    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "100%",
        height: "90%",
        backgroundColor: Colors.SECONDARY_WHITE,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
        shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.121,
        shadowRadius: 9.11,
        elevation: 5,
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        height: "90%",
        backgroundColor: Colors.SECONDARY_WHITE,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
        shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.121,
        shadowRadius: 9.11,
        elevation: 5,
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
});