import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "@env";
import {ROUTE_URL} from "@env";
import _ from "underscore";


const self = module.exports = {
    removeUser: async function () {
        try {
            await AsyncStorage.removeItem("user")
        } catch (e) {

        }
    },
    isLoggedIn: async function () {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
            return true;
        }
        return false;
    },
    /**
     * Look in storage to find cached user. if null, forward to login page
     * @returns {Promise<null|any>}
     */
    findCachedUser: async function () {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
            return JSON.parse(savedUser);
        }
        throw new Error("You have been logged out of the system. Please log back in!");
    },
    uniquify: function (objArray) {
        if (objArray) {
            let result = objArray?.map(a => ({"value": a.route_id, "label": a.route}));
            return _.uniq(result, function (x) {
                return x["value"];
            });
        } else {
            return [];
        }
    },
    /**
     * MAke a request to the API
     * @returns {Promise<null|any>}
     */
    makeMapAPIRequest: async function (origin, destination, departureTime) {
        try {
            const payload = {
                origin: {
                    location: {
                        latLng: origin
                    }
                },
                destination: {
                    location: {
                        latLng: destination
                    }
                },
                routingPreference: "TRAFFIC_AWARE",
                travelMode:  "DRIVE",
                languageCode: "en",
                units : "METRIC",
                departureTime: departureTime
            };
            const url = `${ROUTE_URL}`;
            const options = {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": "AIzaSyAxmcKRmk6orYwdehkPATjDnnKPrLHSQU8",
                    "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
                }
            };
            const response = await fetch(url, options);
            let data = await response.json();
            if (response.ok) {
                return data;
            } else {
                throw data.error.message;
            }

        } catch (error) {
            console.log(error);
            throw error
        }
    },
    /**
     * MAke a request to the API
     * @returns {Promise<null|any>}
     */
    makeAPIRequest: async function (params) {
        try {
            const url = `${API_URL}/${params.url}`;
            const options = {};
            options.method = params.method;

            options.headers = {
                "Content-Type": "application/json",
                "api_key": ""
            };
            if (params.no_key) {

            } else {
                const user = await self.findCachedUser();
                options.headers.api_key = user.api_key;
            }
            if (params.body) {
                options.body = JSON.stringify(params.body)
            }
            const response = await fetch(url, options);
            let data = await response.json();
            if (response.ok) {
                return data;
            } else {
                throw data.error.message;
            }

        } catch (error) {
            console.log(error);
            throw error
        }
    }
};
module.exports = self;
