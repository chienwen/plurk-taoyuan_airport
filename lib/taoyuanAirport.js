const fetch = require('node-fetch');
const baseUrl = 'https://www.taoyuan-airport.com/uploads/flightx/';
const iconv = require('iconv-lite');

function fetchData(isCargo) {
    return new Promise((resolve, reject) => {
        fetch(baseUrl + (isCargo ? 'af_flight_v4.txt' : 'a_flight_v4.txt')).then(res => res.buffer()).then((data) => {
            data = iconv.decode(data, "big5");
            const flightDict = {};
            data.split("\n").forEach((line) => {
                if (line.length > 10) {
                    const cols = line.trim().split(',').map((val) => {
                        return val.trim() || null;
                    });
                    const mapping = [
                        'terminal', 
                        {name: 'type', map: (val) => {
                            return val === 'A' ? 'arrival' : 'departure';
                        }},
                        'airline_iata',
                        'airline_name_zh',
                        'flight_no',
                        'gate',
                        'scheduled_date',
                        'scheduled_time',
                        'estimated_date',
                        'estimated_time',
                        'location_iata',
                        'location_en',
                        'location_zh',
                        'status',
                        {name: 'aircraft', map: (val) => {
                            return (val && val.length > 3) ? val : null;
                        }},
                        'location_other_iata',
                        'location_other_name_en',
                        'location_other_name_zh',
                        'belt',
                        'counter',
                    ];
                    const rawObj = {};
                    for (let i = 0 ; i < cols.length; i++) {
                        let map = mapping[i];
                        if (typeof map === 'string') {
                            rawObj[map] = cols[i];
                        } else {
                            rawObj[map.name] = map.map(cols[i]);
                        }
                    }
                    rawObj.estimated = new Date(rawObj.estimated_date.replace(/\//g, '-') + 'T' + rawObj.estimated_time + '+08:00');
                    rawObj.scheduled = new Date(rawObj.scheduled_date.replace(/\//g, '-') + 'T' + rawObj.scheduled_time + '+08:00');
                    rawObj.isPassenger = !isCargo;
                    const key = rawObj.airline_iata + rawObj.flight_no  + '-' + rawObj.scheduled_date.replace(/\//g, '-');
                    flightDict[key] = rawObj;
                }
            });
            resolve(flightDict);
        }).catch(() => {
            resolve({});
        });
    });
}

module.exports = {
    getFlights: function(cb) {
        Promise.all([fetchData(false), fetchData(true)]).then((data) => {
            const dict = {};
            data.forEach((obj) => {
                Object.assign(dict, obj);
            });
            cb(dict);
        });
    }
};
