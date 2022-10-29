import {Dimensions, StyleSheet, TouchableOpacity, View, Platform, Text, Image} from 'react-native';
import MapView, {AnimatedRegion, Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import {Display} from '../../screens/utils';
import {GOOGLE_API_KEY} from "@env";
import React, {useEffect, useMemo, useRef, useState} from "react";
import imagePath from '../../constants/imagePath';
import {findTicketRoute} from "../../apis/map";
import {updateError} from "../../utils";

const HomeMap = () => {
    let provider;
    if (Platform.OS === 'ios') {
    } else {
        provider = PROVIDER_GOOGLE
    }
    const LATITUDE_DELTA = 0.20;
    const LONGITUDE_DELTA = 0.20;
    const CENTER_OFFSET_DELTA = 0.20;
    const _mapRef = useRef(null);

    const [state, setState] = useState({
        markers: [],
        origin: {},
        destination: {},
        distanceStr: "",
        timeStr: "",
        time: 0,
        distance: 0
    });
    const {
        markers,
        origin,
        destination,
        initialRegion,
        center
    } = state
    const updateState = (data) => setState((state) => ({...state, ...data}));

    /**
     *
     */
    const onCenter = () => {
        if(center) {
            _mapRef.current.animateToRegion(center);
        }
    }
    const computeCenter = function(originArg,destinationArg){

        let org = originArg;
        let dest = destinationArg;
        if(!org){
            org = origin;
            dest = destination;
        }
        if(org.latitude) {
            let sumLat = parseFloat(org.latitude) + parseFloat(dest.latitude)
            let sumLong = parseFloat(org.longitude) + parseFloat(dest.longitude)

            let avgLat = (sumLat / 2) || 0;
            let avgLong = (sumLong / 2) || 0;
            return {
                latitude: parseFloat(avgLat),
                longitude: parseFloat(avgLong),
                latitudeDelta: LATITUDE_DELTA + CENTER_OFFSET_DELTA,
                longitudeDelta: LONGITUDE_DELTA +CENTER_OFFSET_DELTA,
            };
        }
    }
    useMemo(() => {
        async function populateData() {
            try {
                const mapData = await findTicketRoute();
                if (mapData) {
                    let sumLat = parseFloat(mapData.origin.latitude) + parseFloat(mapData.destination.latitude)
                    let sumLong = parseFloat(mapData.origin.longitude) + parseFloat(mapData.destination.longitude)

                    let avgLat = (sumLat / 2) || 0;
                    let avgLong = (sumLong / 2) || 0;

                    const initRegion = {
                        latitude: parseFloat(avgLat),
                        longitude: parseFloat(avgLong),
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    };
                    const mks = [
                        {
                            coordinate: mapData.origin,
                            title: mapData.originBusStop,
                            id: 1,
                            image: imagePath.icRedMarker,
                            identifier: 'mk1'
                        },
                        {
                            coordinate: mapData.destination,
                            title: mapData.destinationBusStop,
                            id: 2,
                            identifier: 'mk2',
                            image: imagePath.icGreenMarker
                        }
                    ]
                    updateState({
                        markers: mks,
                        origin: {
                            latitude: parseFloat(mapData.origin.latitude),
                            longitude: parseFloat(mapData.origin.longitude)
                        },
                        destination: {
                            latitude: parseFloat(mapData.destination.latitude),
                            longitude: parseFloat(mapData.destination.longitude)
                        },
                        initialRegion: computeCenter(mapData.origin,mapData.destination),
                        center: computeCenter(mapData.origin,mapData.destination)
                    })
                }
                return "done"
            } catch (err) {
                console.log(err);
                console.log("Something went wrong")
                return updateError(err.toString(), setError);
            }
        }

        populateData().catch();
    }, []);
    useEffect(() => {

    }, []);
    return (
        <View style={{
            backgroundColor: "#a0abff",
            justifyContent: 'center',
            alignItems: 'center',
            height: Display.setHeight(50),
            width: Display.setWidth(100),
        }}>
            <MapView style={{height: "100%", width: "100%"}}
                     ref={_mapRef}
                     provider={provider}
                     initialRegion={initialRegion}
                     onRegionChangeComplete={region => {
                         //setRegion(region);
                     }}
                     onMapReady={() => {
                         _mapRef.current.fitToSuppliedMarkers(['mk1', 'mk2'],
                             {
                                 edgePadding:
                                     {
                                         top: 50,
                                         right: 50,
                                         bottom: 50,
                                         left: 50
                                     }
                             })
                     }}>
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        identifier={marker.identifier}
                        coordinate={marker.coordinate}
                        title={marker.title}>
                        <Image source={marker.image} style={{height: 24, width: 24}}/>
                    </Marker>
                ))}
                {Object.keys(origin).length > 0 && (<MapViewDirections
                    origin={origin}
                    destination={destination}
                    strokeWidth={5}
                    strokeColor="#0096FF"
                    apikey={GOOGLE_API_KEY}
                    onReady={result => {
                        //setDistance(result.distance)
                        //setDuration(parseFloat(result.duration).toFixed(2))
                    }}
                />)}
            </MapView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                }}
                onPress={onCenter}>
                <Image source={imagePath.greenIndicator}/>
            </TouchableOpacity>
        </View>
    );
}
export default HomeMap;
