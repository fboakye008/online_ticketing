import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "../contents";
import _ from "underscore";
import moment from "moment";
import {fetchTickets} from "../apis/tickets";
import {updateError} from "./utils/validations";
import DisplayTrip from "../components/CustomInput/DisplayTrip";

const Trips = ({navigation}) => {
    const [error, setError] = useState("");
    const [trips, setTrips] = useState([]);

    const prepareTrips = (trips) => {
        const result = trips.map(trip => ({
            booking_id: trip.booking_id,
            route: trip.route,
            departure_time: trip.departure_time
        }));
        const uniqueBookings = _.uniq(result, function (x) {
            return x["booking_id"];
        });
        const sorted = _.sortBy(uniqueBookings, function (item) {
            const d = new Date(item.departure_time);
            const mt = moment(d).format('DD/MM/YYYY mm:hh:ss A')
            return -moment(mt, 'DD/MM/YYYY mm:hh:ss A').unix(); // parse date with moment >> format to UNIX timestamp
        });
        return sorted.map(trip => ({key: trip.booking_id, title: trip.route + " (" + moment(trip.departure_time).format('DD/MM/YYYY mm:hh A') + ")"}));
    };
    useEffect(() => {
        async function populateData() {
            const userTickets = await fetchTickets();
            const trips = prepareTrips(userTickets);
            if (trips && trips.length > 0) {
                setTrips(trips);
            }
        }

        try {
            const x = populateData();
        } catch (e) {
            return updateError(e, setError);
        }
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#e6e7e8"}}>
            {error ? (
                <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                    {error}
                </Text>
            ) : null}
            <TouchableOpacity
                style={styles.arrowContainer}
                onPress={() => navigation.goBack()}
            >
                <MaterialIcons name="keyboard-arrow-left" size={30} color="#000"/>
            </TouchableOpacity>
            <View>
                <Text style={styles.title}>Trips</Text>
                <View style={styles.tripHistoryWrapper}>
                    {trips.map(trip => {
                        return <DisplayTrip title={trip.title} key={trip.key}></DisplayTrip>
                    })}
                </View>
            </View>
        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    arrowContainer: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.SECONDARY_WHITE,
        borderRadius: 10,
        marginLeft: 10,
        shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.121,
        shadowRadius: 9.11,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: 5,
    },
})
export default Trips;
