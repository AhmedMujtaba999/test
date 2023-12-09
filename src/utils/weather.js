function weather(lat, lng, callback) {
    const axios = require('axios')
    const params = {
        access_key: '8eb1ceb1d2ddf79dc55b79d640095e39',
        query: `${lat},${lng}`,
        // JSON:true
    }

    axios.get('http://api.weatherstack.com/current', { params })
        .then(response => {
            const apiResponse = response.data;
            const placeName = apiResponse.location.name;
            console.log(apiResponse.location.name);
            const temp = apiResponse.current.temperature;
            console.log(`Current temperature in ${placeName} is ${temp}℃`);
            callback(placeName, temp)

        }).catch(error => {
            console.log(error);
        });
}

module.exports = weather;

    // encodeURIComponent(adress) use this always 


