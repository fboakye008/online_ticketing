import React, { useState, useRef, useEffect } from 'react';
import { Button,View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import MapView, {Marker, AnimatedRegion, Polyline} from 'react-native-maps';
import imagePath from '../constants/imagePath';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from "@env";
import {findMapRoute} from "../apis/map";
import {updateError} from '../utils';
const MapScreen = () => {

    const screen = Dimensions.get('window');
    const ASPECT_RATIO = screen.width / screen.height;
    const LATITUDE_DELTA = 0.04;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const mapRef = useRef();
    const markerRef = useRef();
    // const origin = {latitude: 5.723669726699578, longitude: 0.043682456624945014};
    // const destination = {latitude: 5.722853131829537, longitude: 0.03143773186297082};
    const [coordinates, setCoordinates] = useState([]);
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const coords= [
    //     {"latitude": 5.72361, "longitude": 0.04364},
    //     {"latitude": 5.72393, "longitude": 0.04307},
    //     {"latitude": 5.72427, "longitude": 0.0424},
    //     {"latitude": 5.72457, "longitude": 0.04178},
    //     {"latitude": 5.72476, "longitude": 0.04141},
    //     {"latitude": 5.72423, "longitude": 0.04104},
    //     {"latitude": 5.72207, "longitude": 0.0392},
    //     {"latitude": 5.72159, "longitude": 0.0388},
    //     {"latitude": 5.72144, "longitude": 0.03866},
    //     {"latitude": 5.72081, "longitude": 0.03816},
    //     {"latitude": 5.71995, "longitude": 0.03746},
    //     {"latitude": 5.71928, "longitude": 0.03697},
    //     {"latitude": 5.71897, "longitude": 0.03651},
    //     {"latitude": 5.71898, "longitude": 0.03644},
    //     {"latitude": 5.72233, "longitude": 0.03142},
    //     {"latitude": 5.72245, "longitude": 0.03147},
    //     {"latitude": 5.72253, "longitude": 0.03149},
    //     {"latitude": 5.72268, "longitude": 0.03146},
    //     {"latitude": 5.72284, "longitude": 0.03139}
    // ];
    const [state, setState] = useState({
        curLoc: origin,
        live: "0",
        destinationCords: destination,
        isLoading: false,
        coordinate: new AnimatedRegion({
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        time: 1,
        distance: 1,
        heading: 0
    });
    const { curLoc, timeStr, distanceStr, destinationCords, coordinate,live } = state
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    /**
     *
     * @param q
     * @returns {Promise<void>}
     */
    const getLiveLocation = async (q) => {
        animate(q.latitude, q.longitude);
        updateState({
            live: live,
            curLoc: q,
            coordinate: new AnimatedRegion({
                latitude: q.latitude,
                longitude: q.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            })
        })
    }

    useEffect(() => {
        async function populateData() {
            try {
                const mapData = await findMapRoute();
                if(mapData) {
                    setCoordinates(mapData?.coordinates);
                    setOrigin(mapData?.origin);
                    setDestination(mapData?.destination);
                    fetchTime(mapData?.distance, mapData?.duration);
                }
                return "done"
            }catch(err){
                console.log(err);
                console.log("Something went wrong")
                return updateError(err.toString(), setError);
            }
        }
        populateData().catch();
    }, [coordinates]);
    /**
     *
     */
    // useEffect(() => {
    //     const g = getLiveLocation(coordinates[0])
    // }, [])
    /**
     *
     */
    // useEffect(() => {
    //     let counter = 0;
    //     const interval = setInterval(() => {
    //         const q = coordinates[counter];
    //         const g = getLiveLocation(q)
    //         counter++;
    //         if (counter === coordinates.length) {
    //             clearInterval(interval);
    //         }
    //     }, 2000);
    // }, [])
    const startAnimation = function(){
        let counter = 0;
        const interval = setInterval(() => {
            const q = coordinates[counter];
            const g = getLiveLocation(q)
            counter++;
            if (counter === coordinates.length) {
                clearInterval(interval);
            }
        }, 2000);
    }
    /**
     *
     * @param data
     */
    const fetchValue = (data) => {
         updateState({
            destinationCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
            }
        })
    }
    /**
     *
     * @param latitude
     * @param longitude
     */
    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        coordinate.timing(newCoordinate).start();
    }
    /**
     *
     */
    const onCenter = () => {
        mapRef.current.animateToRegion({
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }
    /**
     *
     * @param distance
     * @param time
     */
    const fetchTime = (distance, time) => {
        const dst = `Distance: ${distance.toFixed(2)} km`;
        const tst = `Duration: ${time.toFixed(0)} min`;
        updateState({
            distance: distance,
            time: time,
            distanceStr: dst,
            timeStr: tst
        })
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        ...curLoc,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}>
                    <Marker.Animated
                        ref={markerRef}
                        coordinate={coordinate}>
                        <Image
                            source={imagePath.bus}
                            style={{
                                width: 40,
                                height: 40,
                                //transform: [{rotate: `${heading}deg`}]
                            }}
                            resizeMode="contain"
                        />
                    </Marker.Animated>
                    {Object.keys(destinationCords).length > 0 && (<Marker
                        coordinate={destinationCords}
                        image={imagePath.icGreenMarker}
                    />)}
                    {(() => {
                        switch (live) {
                            case "1":
                            return Object.keys(destinationCords).length > 0 && (<MapViewDirections
                                origin={curLoc}
                                destination={destinationCords}
                                apikey={GOOGLE_API_KEY}
                                strokeWidth={6}
                                strokeColor="red"
                                optimizeWaypoints={true}
                                onStart={(params) => {
                                    //console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                                }}
                                onReady={result => {
                                    fetchTime(result.distance, result.duration)
                                    mapRef.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            // right: 30,
                                            // bottom: 300,
                                            // left: 30,
                                            // top: 100,
                                        },
                                    });
                                }}
                                onError={(errorMessage) => {
                                    // console.log('GOT AN ERROR');
                                }}
                            />);
                            default:
                            return (coordinates.length > 0 && <Polyline coordinates={coordinates}
                                                            strokeColor={"red"}
                                                            strokeWidth={3}
                                                            lineDashPattern={[1]}/>);
                        }
                    })()}
                </MapView>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                    }}
                    onPress={onCenter}>
                    <Image source={imagePath.greenIndicator} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomCard}>
                <Text>Time left: {distanceStr} </Text>
                <Text>Distance left: {timeStr}</Text>
                <Button onPress={() => startAnimation()} title="Start Animation" color="#841584"/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24
    },
    inputStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16
    }
});
export default MapScreen;
