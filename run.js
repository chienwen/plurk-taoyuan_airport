const aviation = require('./lib/aviation');
const airlineIATA2name = require('./lib/airlineIATA2name');
const airportIATA2name = require('./lib/airportIATA2name');

const emojiDict = {
    'flying': '✈️ ',
    'forbidden': '⛔',
    'clock': '⏰',
};

let plurk = require('./lib/plurk');
if (process.argv.length === 4 && process.argv[3] === 'debug') {
    plurk = {
        callAPI: (url, param, cb) => {
            cb(null, {
                plurk_id: 'DEBUG',
                qualifier_translated: param.qualifier,
                content: param.content
            });
        }
    };
}

function postPlurk(content, qualifier) {
    return new Promise((resolve, reject) => {
            plurk.callAPI('/APP/Timeline/plurkAdd', {
            content,
            qualifier: qualifier || 'says',
            lang: 'tr_ch',
        }, (err, data) => {
            if (err) {
                console.log('ERROR', err);
                reject(err);
            } else {
                console.log('======== OK', data.plurk_id, data.qualifier_translated, data.content);
                resolve(data);
            }
        });
    });
}

function timeToDisplay(hour, minute) {
    const twoDigits = (n) => {
        if (n < 10) {
            return '0' + n;
        } else {
            return '' + n;
        }
    };
    return twoDigits(hour) + ':' + twoDigits(minute);
}

const taskRouter = {
    all: function() {
        Object.keys(this).filter(task => task !== 'all').forEach((task) => {
            console.log('Invoke task', task);
            taskRouter[task]();
        });
    },
    departure: function() {
        aviation.getFlights({
            dep_iata: 'tpe',
            //flight_status: 'scheduled', //scheduled, active, landed, cancelled, incident, diverted
        }, (data) => {
            if (data) {
                const tsNow = (new Date()).getTime();
                const flights = data.data.filter((flight) => {
                    const departureTsEstimated = (new Date(flight.departure.estimated.replace(/\+00:00/, '+08:00'))).getTime();
                    const tsDiff = departureTsEstimated - tsNow;
                    //if (flight.departure.gate && tsDiff >= 0 && tsDiff <= 1 * 3600000) {
                    if (tsDiff >= 0 && tsDiff <= 1 * 3600000) {
                    //if (true) {
                        console.log(flight);
                        return true;
                    } 
                    return false;
                });
                const annocements = [];
                flights.forEach((flight) => {
                    const simpleTime = new Date(flight.departure.estimated);
                    const simpleTimeStr = timeToDisplay(simpleTime.getUTCHours(), simpleTime.getUTCMinutes());
                    if (flight.flight_status.match(/scheduled|active/)) {
                        let sentenceElements = [emojiDict.flying, '搭乘', airlineIATA2name(flight.airline.iata), '公司', flight.flight.number, '班機', simpleTimeStr, '飛往', airportIATA2name(flight.arrival.iata)];
                        if (flight.departure.gate) {
                            sentenceElements = sentenceElements.concat(['旅客請由', flight.departure.gate, '號門登機']);
                        } else {
                            sentenceElements = sentenceElements.concat(['登機門', '容後播報']);
                        }
                        annocements.push(sentenceElements.join(' '));
                    } else if (flight.flight_status === 'cancelled') {
                        annocements.push([emojiDict.forbidden, '已取消', airlineIATA2name(flight.airline.iata), '公司', flight.flight.number, '班機', simpleTimeStr, '飛往', airportIATA2name(flight.arrival.iata)].join(' '));
                    }
                });
                const tpeTime = new Date(tsNow + 3600000 * 8);
                const tpeTimeStr = (tpeTime.getUTCMonth() + 1) + '月' + tpeTime.getUTCDate() + '日 ' + timeToDisplay(tpeTime.getUTCHours(), tpeTime.getUTCMinutes());
                const sentence = annocements.join("\n") + "\n" + emojiDict.clock + " 台北時間 " + tpeTimeStr;
                console.log(sentence);
            }
        });
        //postPlurk(`${data.sentence}`, 'thinks');
    },
};

if (process.argv.length < 3 || (!taskRouter[process.argv[2]])) {
    console.error('Usage:', process.argv[0], process.argv[1], Object.keys(taskRouter).join('|'), '[debug]');
    return -1;
}

taskRouter[process.argv[2]]();