import utils from './utils'
function RequestSchedule() {
    const fetchRoutes = async () => {
        const options = {
            url : "v_available_seats",
            method : "GET",
            no_key : true,
        }
        return await utils.makeAPIRequest(options)
    };
    return fetchRoutes();
}
export { RequestSchedule};
