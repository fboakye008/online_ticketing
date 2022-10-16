import utils from './utils'
function RequestRoutes() {
    const fetchRoutes = async () => {

        const options = {
            url : "v_bus_routes",
            method : "GET"
        }
        return await utils.makeAPIRequest(options)
    };
    return fetchRoutes();
}
export { RequestRoutes};
