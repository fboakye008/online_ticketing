import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useState} from "react";

const HomeMap = () => {
    const [markers, setMarkers] = useState([]);

    return (
        <View style={{
            height: 440,
            backgroundColor: "#a0abff",
            justifyContent: 'center',
            alignItems: 'center',
        }}>

            <MapView
                style={{height: "100%", width: "100%"}}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            ></MapView>
        </View>
    )
}

export default HomeMap;