require('dotenv').config({ path: './utils' })
const opencage = require('opencage-api-client');

const geolocation = (placeName, callBack) => {
    // note that the library takes care of URI encoding
    opencage
        .geocode({ q: placeName })
        .then((data) => {
            // console.log(JSON.stringify(data));

            if (data.status.code === 200 && data.results.length > 0) {
                const lat = JSON.stringify(data.results[0].geometry.lat);
                const lng = JSON.stringify(data.results[0].geometry.lng);

                callBack(lat, lng);

            } else {
                console.log('connection : ', data.status.message);
                consolsse.log('total_results', data.total_results);
                console.log('please try valid location and kindly make note of spellings');
            }
        })
        .catch((error) => {

            console.log(JSON.stringify(error));
            console.log('Error message : ', error.message);
            // other possible response codes:
            // // https://opencagedata.com/api#codes
            console.log('error code : ', error.code);

            if (error.code === 402) {
                console.log('hit free trial daily limit');
                console.log('become a customer: https://opencagedata.com/pricing');
            }

        });



}

// geolocation('new york');

module.exports = geolocation;


