const fetch = require('node-fetch');
const config = require('./config');
const AVIATIONSTACK_API_KEY = config('AVIATIONSTACK_API_KEY');

module.exports = {
    getFlights: function(params, cb) {
        params.access_key = AVIATIONSTACK_API_KEY;
        const paramsTokenArr = [];
        Object.keys(params).forEach((key) => {
            if (params[key]) {
                paramsTokenArr.push(key + '=' + encodeURIComponent(params[key]));
            }
        });
        const url = 'http://api.aviationstack.com/v1/flights?' + paramsTokenArr.join('&');
        console.log('will call', url);
        fetch(url).then(res => res.json())
        .then((data) => {
            cb(data);
        }).catch(err => {
            console.log(err);
            cb(null);
        });
    }
};
