const aviation = require('./lib/aviation');
const airlineIATA2name = require('./lib/airlineIATA2name');
const airportIATA2name = require('./lib/airportIATA2name');
const tsNow = (new Date()).getTime();

const emojiDict = {
    'getIsPassenger': function(isPassenger) {
        return isPassenger ? this.people : this.cargo;
    },
    'people': '🧑‍🤝‍🧑',
    'departure': '🛫',
    'cargo': '📦',
    'arrival': '🛬',
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

function postPlurkWithTime(annocements, qualifier) {
    if (annocements.length == 0) {
        return;
    }
    const tpeTime = new Date(tsNow + 3600000 * 8);
    const tpeTimeStr = (tpeTime.getUTCMonth() + 1) + '月' + tpeTime.getUTCDate() + '日 ' + timeToDisplay(tpeTime.getUTCHours(), tpeTime.getUTCMinutes());
    const timeFooter = emojiDict.clock + " 台北 " + tpeTimeStr;
    let str = '';
    while(annocements.length > 0) {
        let nextAnnocement = annocements.pop();
        if (timeFooter.length + str.length + nextAnnocement.length + 1 <= 360) {
            str += nextAnnocement + "\n";
        } else {
            break;
        }
    }
    postPlurk(str + timeFooter, qualifier);
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

function filterFlightTimeWindow(flight, type) {
    const tsEstimated = (new Date(flight[type].estimated.replace(/\+00:00/, '+08:00'))).getTime();
    const tsDiff = (type === 'arrival' ? (tsNow - tsEstimated) : (tsEstimated - tsNow));
    return tsDiff >= 0 && tsDiff < 1 * 3600000;
}

const taskRouter = {
    all: function() {
        Object.keys(this).filter(task => task !== 'all').forEach((task) => {
            console.log('Invoke task', task);
            taskRouter[task]();
        });
    },
    arrival: function() {
        aviation.getFlights({
            arr_iata: 'tpe',
        }, (data) => {
            if (data) {
                const flights = data.data.filter((flight) => {
                    return filterFlightTimeWindow(flight, 'arrival');
                });
                const annocements = [];
                flights.forEach((flight) => {
                    const simpleTime = new Date(flight.arrival.estimated);
                    const simpleTimeStr = timeToDisplay(simpleTime.getUTCHours(), simpleTime.getUTCMinutes());
                    const airlineName = airlineIATA2name(flight.airline.iata);
                    annocements.push([emojiDict.arrival, emojiDict.getIsPassenger(flight.departure.gate) , simpleTimeStr, airlineName, flight.flight.iata, '來自', airportIATA2name(flight.departure.iata)].join(' '));
                });
                postPlurkWithTime(annocements, 'has');
            }
        });
    },
    departure: function() {
        aviation.getFlights({
            dep_iata: 'tpe',
            //flight_status: 'scheduled', //scheduled, active, landed, cancelled, incident, diverted
        }, (data) => {
            if (data) {
                const flights = data.data.filter((flight) => {
                    return filterFlightTimeWindow(flight, 'departure');
                });
                const annocements = [];
                flights.forEach((flight) => {
                    const simpleTime = new Date(flight.departure.estimated);
                    const simpleTimeStr = timeToDisplay(simpleTime.getUTCHours(), simpleTime.getUTCMinutes());
                    const airlineName = airlineIATA2name(flight.airline.iata);
                    if (flight.flight_status.match(/scheduled|active/)) {
                        let sentenceElements = [emojiDict.departure, emojiDict.getIsPassenger(flight.departure.gate), simpleTimeStr, airlineName, flight.flight.iata, '飛往', airportIATA2name(flight.arrival.iata)];
                        if (flight.departure.gate) {
                            sentenceElements = sentenceElements.concat(['登機門', flight.departure.gate]);
                        }
                        annocements.push(sentenceElements.join(' '));
                    } else if (flight.flight_status === 'cancelled') {
                        annocements.push([emojiDict.departure, emojiDict.forbidden, simpleTimeStr, airlineName, flight.flight.iata, '飛往', airportIATA2name(flight.arrival.iata)].join(' '));
                    }
                });
                postPlurkWithTime(annocements, 'will');
            }
        });
    },
};

if (process.argv.length < 3 || (!taskRouter[process.argv[2]])) {
    console.error('Usage:', process.argv[0], process.argv[1], Object.keys(taskRouter).join('|'), '[debug]');
    return -1;
}

taskRouter[process.argv[2]]();
