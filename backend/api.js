const axios = require('axios');
const config = require('./config')


const api = {
    link: "http://www.omdbapi.com/",
    key: config.api_key,
    sendRequest: async (params) => {
        try {
            Object.assign(params, { apikey: api.key });
            const { data } = await axios.get(api.link, {params});
            console.log(data)
            return data;
        } catch (error) {
            console.error(error)
            throw new Error
        }
    }
}

module.exports = api