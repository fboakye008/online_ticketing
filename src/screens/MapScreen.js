import React, {useEffect, useRef, useState} from "react";
import {Button, Dimensions, Image, Platform, StyleSheet, Text, View} from "react-native";
import MapView, {AnimatedRegion, Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import {Marker} from "react-native-maps";
import {decode} from "@mapbox/polyline";
import utils from "../apis/utils";
import {RequestRoutes} from "../apis/routes";
import moment from "moment";
import {updateError} from "../utils"; //please install this package before running!
import imagepointer from '../../assets/logo1.png';

const MapScreen = ({navigation}) => {
    const {width, height} = Dimensions.get('window');
    const origin = {latitude: 5.723669726699578, longitude: 0.043682456624945014};
    const destination = {latitude: 5.722853131829537, longitude: 0.03143773186297082};
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const initialRegion = {
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [st, setSt] = useState({
        curLoc: {
            latitude: origin.latitude,
            longitude: origin.longitude,
        },
        destinationCords: {},
        isLoading: false,
        coordinate: new AnimatedRegion({
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    });
    const [coordinate, setCoordinate] = useState(new AnimatedRegion({
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    }))
    const [coords, setCoords] = useState([{"latitude": 5.72361, "longitude": 0.04364}, {
        "latitude": 5.72393,
        "longitude": 0.04307
    }, {"latitude": 5.72427, "longitude": 0.0424}, {"latitude": 5.72457, "longitude": 0.04178}, {
        "latitude": 5.72476,
        "longitude": 0.04141
    }, {"latitude": 5.72423, "longitude": 0.04104}, {"latitude": 5.72207, "longitude": 0.0392}, {
        "latitude": 5.72159,
        "longitude": 0.0388
    }, {"latitude": 5.72144, "longitude": 0.03866}, {"latitude": 5.72081, "longitude": 0.03816}, {
        "latitude": 5.71995,
        "longitude": 0.03746
    }, {"latitude": 5.71928, "longitude": 0.03697}, {"latitude": 5.71897, "longitude": 0.03651}, {
        "latitude": 5.71898,
        "longitude": 0.03644
    }, {"latitude": 5.72233, "longitude": 0.03142}, {"latitude": 5.72245, "longitude": 0.03147}, {
        "latitude": 5.72253,
        "longitude": 0.03149
    }, {"latitude": 5.72268, "longitude": 0.03146},
        {"latitude": 5.72284, "longitude": 0.03139}
    ]);

    const [region, setRegion] = useState(initialRegion);

    useEffect(() => {
        async function populateData() {
            try {
                // const cd = await getDirections(origin, destination);
                //setCoords(cd);
                // console.log(cd);
                return "done"
            } catch (err) {
                console.log(err);
                console.log("Something went wrong")
                throw err;
                //return updateError(err.toString(), setError);
            }
        }

        populateData().then(function (f) {
            //ff()
        }).catch();
    }, [coords]);

    const animateRoute = function () {

        let counter = 0;
        let i = setInterval(function () {
            const q = coords[counter];
            startAnimation(q.latitude, q.longitude)
            counter++;
            if (counter === coords.length) {
                clearInterval(i);
            }
        }, 4000);
    }
    const startAnimation = (lat, longg) => {
        const newCoordinate = {
            latitude: lat,
            longitude: longg,
            latitudeDelta: 0.012,
            longitudeDelta: 0.012,
        };
        mapRef.current.animateToRegion({latitude: lat, longitude: longg}, 3000);
        coordinate.timing(newCoordinate).start();
    };
    const getDirections = async (startLoc, destinationLoc) => {
        try {
            const departureTime = "2023-10-25T15:01:23.045123456Z"
            const resp = await utils.makeMapAPIRequest(startLoc, destinationLoc, departureTime);
            const encodedPolyline = resp.routes[0].polyline.encodedPolyline;
            const points = decode(encodedPolyline, 5);
            const cds = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                };
            });
            return cds;
        } catch (error) {
            return error;
        }
    };
    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={StyleSheet.absoluteFill}
                initialRegion={initialRegion}
                onRegionChangeComplete={(region) => setRegion(region)}
            >
                {coords.length > 0 && <Polyline coordinates={coords} strokeColor={"red"}
                                                strokeWidth={3}
                                                lineDashPattern={[1]}/>}

                <Marker.Animated style={styles.markerAnimation}
                                 ref={markerRef}
                                 coordinate={coordinate}>
                    <Image source={imagepointer} style={styles.image}/>
                </Marker.Animated>
            </MapView>
            <Button onPress={() => animateRoute()} title="Start Animation" color="#841584"/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    markerAnimation: {
        paddingVertical: 1,
        paddingHorizontal: 1,
        borderRadius: 1,
        elevation: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    image: {height: 24, width: 30, transform: [{rotateY: '180deg'}]},
    text: {
        fontSize: 20,
        backgroundColor: "lightblue",
    },
});
export default MapScreen;