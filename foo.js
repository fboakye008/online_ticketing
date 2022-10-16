const _ = require("underscore")
const objArray = [{
    "bus_stop": "Kwame Nkrumah Circle, Dr. Busia Hwy, Accra, Ghana",
    "bus_stop_order": 1,
    "departure_time": "2022-10-11T22:17:59.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "Achimota Old Station Bus Stop, Accra, Ghana",
    "bus_stop_order": 2,
    "departure_time": "2022-10-11T22:17:59.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "China Mall Amasaman, PM8V+G82, Amasaman, Ghana",
    "bus_stop_order": 3,
    "departure_time": "2022-10-11T22:17:59.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "MEDIE, QM6G+RJW, Medie, Ghana",
    "bus_stop_order": 4,
    "departure_time": "2022-10-11T22:17:59.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "Teye Lawer Ent., RJ9W+MCR, Nsawam Road, Nsawam, Ghana",
    "bus_stop_order": 5,
    "departure_time": "2022-10-11T22:17:59.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "MCANIM SERVICE STATION, Nsawam - Suhum Rd, Teacher Mante, Ghana",
    "bus_stop_order": 6,
    "departure_time": "2022-10-11T22:17:59.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "Asuboi Health centre,Asuboe, Ghana",
    "bus_stop_order": 7,
    "departure_time": "2022-10-11T22:17:59.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "Sankofa filling Station,Amanase, Ghana",
    "bus_stop_order": 8,
    "departure_time": "2022-10-11T22:17:59.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "Asafo Market, Nhyiaeso, Accra, Ghana",
    "bus_stop_order": 9,
    "departure_time": "2022-10-11T22:17:59.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "Kwame Nkrumah Circle, Dr. Busia Hwy, Accra, Ghana",
    "bus_stop_order": 1,
    "departure_time": "2022-10-12T12:28:13.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "Achimota Old Station Bus Stop, Accra, Ghana",
    "bus_stop_order": 2,
    "departure_time": "2022-10-12T12:28:13.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "China Mall Amasaman, PM8V+G82, Amasaman, Ghana",
    "bus_stop_order": 3,
    "departure_time": "2022-10-12T12:28:13.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "MEDIE, QM6G+RJW, Medie, Ghana",
    "bus_stop_order": 4,
    "departure_time": "2022-10-12T12:28:13.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "Teye Lawer Ent., RJ9W+MCR, Nsawam Road, Nsawam, Ghana",
    "bus_stop_order": 5,
    "departure_time": "2022-10-12T12:28:13.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "MCANIM SERVICE STATION, Nsawam - Suhum Rd, Teacher Mante, Ghana",
    "bus_stop_order": 6,
    "departure_time": "2022-10-12T12:28:13.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "Asuboi Health centre,Asuboe, Ghana",
    "bus_stop_order": 7,
    "departure_time": "2022-10-12T12:28:13.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "Sankofa filling Station,Amanase, Ghana",
    "bus_stop_order": 8,
    "departure_time": "2022-10-12T12:28:13.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}, {
    "bus_stop": "Asafo Market, Nhyiaeso, Accra, Ghana",
    "bus_stop_order": 9,
    "departure_time": "2022-10-12T12:28:13.000Z",
    "fare": 45.35,
    "id": null,
    "route": "ACCRA-KUMASI",
    "route_id": 1
}];
const uniquify =  function (objArray) {
    let result = objArray.map(a => ({"value":a.route_id, "label": a.route}));
    return _.uniq(result, function (x) {
        return x["value"];
    });
}
const isValidPhone = (value) => {
    const regx =
        /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    return regx.test(value);
}
console.log(isValidPhone("0123456789"));

