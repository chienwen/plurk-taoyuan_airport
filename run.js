const aviation = require('./lib/aviation');
const taoyuanAirport = require('./lib/taoyuanAirport');
const airlineIATA2name = require('./lib/airlineIATA2name');
const airportIATA2name = require('./lib/airportIATA2name');
const tsNow = (new Date()).getTime();

const SETTINGS = {
    SHOW_AIRCRAFT: false,
    SHOW_CANCELLED: false,
};

const emojiDict = {
    'getIsPassenger': function(isPassenger) {
        return isPassenger ? this.people : this.cargo;
    },
    'people': '🧑‍🤝‍🧑',
    'departure': '🛫',
    'cargo': '📦',
    'arrival': '🛬',
    'plane': '✈️ ',
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

function twoDigits(n) {
    if (n < 10) {
        return '0' + n;
    } else {
        return '' + n;
    }
}

function timeToDisplay(hour, minute) {
    return twoDigits(hour) + ':' + twoDigits(minute);
}

function filterFlightTimeWindow(flight, type) {
    const tsEstimated = (new Date(flight[type].estimated.replace(/\+00:00/, '+08:00'))).getTime();
    const tsDiff = (type === 'arrival' ? (tsNow - tsEstimated) : (tsEstimated - tsNow));
    return tsDiff >= 0 && tsDiff < 1 * 3600000;
}

function getUniqueFlightsMergedCodeshares(flights) {
    const uniqFlights = flights.filter((flight) => {
        return !flight.flight.codeshared;
    });
    flights.forEach((flight) => {
        if (flight.flight.codeshared) {
            for (let i = 0; i < uniqFlights.length; i++) {
                if (uniqFlights[i].flight.iata.toLowerCase() === flight.flight.codeshared.flight_iata.toLowerCase()) {
                    if (!uniqFlights[i].flight.aka) {
                        uniqFlights[i].flight.aka = [];
                    }
                    uniqFlights[i].flight.aka.push(flight);
                    break;
                }
            }
        }
    });
    return uniqFlights;
}

function isThisFlightPassenger(flight) {
    if (flight.departure.gate) {
        const gate = flight.departure.gate;
        return gate.length <= 2;
    } else {
        return false;
    }
}

function checkedByTaoYuan(data, flights) {
    flights.forEach((flight) => {
        let simpleTime;
        if (flight.departure.iata === 'TPE') {
            simpleTime = new Date(flight.departure.scheduled);
        } else {
            simpleTime = new Date(flight.arrival.scheduled);
        }
        const simpleDateStr = simpleTime.getUTCFullYear() + '-' + twoDigits(simpleTime.getUTCMonth() + 1) + '-' + twoDigits(simpleTime.getUTCDate());
        const taoYuanKey = flight.flight.iata + '-' + simpleDateStr;
        if (data[taoYuanKey]) {
            const tdata = data[taoYuanKey];
            if (tdata.status.match(/CANCELLED/)) {
                flight.flight_status = 'cancelled';
            }
            flight.aircraft = flight.aircraft || tdata.aircraft;
            ['gate', 'belt', 'counter'].forEach((col) => {
                if (tdata[col]) {
                    flight[tdata.type][col] = tdata[col];
                }
            });
            flight.isPassenger = tdata.isPassenger;
            if (tdata.location_other_iata) {
                flight[tdata.type === 'arrival' ? 'departure' : 'arrival'].original = {
                    iata: tdata.location_other_iata,
                    name_zh: tdata.location_other_name_zh,
                    name_en: tdata.location_other_name_en,
                };
            }
        } else {
            //flight.flight_status = 'cancelled';
        }
    });
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
            if (!data) {
                return;
            }
            taoyuanAirport.getFlights((taoyuanData) => {
                const flights = data.data.filter((flight) => {
                    return filterFlightTimeWindow(flight, 'arrival');
                });
                const annocements = [];
                const flightsMergedCodeshares = getUniqueFlightsMergedCodeshares(flights); 
                checkedByTaoYuan(taoyuanData, flightsMergedCodeshares);
                flightsMergedCodeshares.forEach((flight) => {
                    if ((!SETTINGS.SHOW_CANCELLED) && flight.flight_status === 'cancelled') {
                        return;
                    }
                    const simpleTime = new Date(flight.arrival.estimated);
                    const simpleTimeStr = timeToDisplay(simpleTime.getUTCHours(), simpleTime.getUTCMinutes());
                    const airlineName = airlineIATA2name(flight.airline.iata);
                    let isPassenger = flight.isPassenger !== undefined ? flight.isPassenger : isThisFlightPassenger(flight);
                    let sentenceElements = [emojiDict.arrival, flight.flight_status === 'cancelled' ? emojiDict.forbidden : emojiDict.getIsPassenger(isPassenger) , simpleTimeStr];
                    let allSharedFlights = [airlineName, flight.flight.iata];
                    if (flight.flight.aka) {
                        flight.flight.aka.forEach((sharedFlight) => {
                            allSharedFlights.push(airlineIATA2name(sharedFlight.airline.iata));
                            allSharedFlights.push(sharedFlight.flight.iata);
                        });
                    }
                    sentenceElements = sentenceElements.concat(allSharedFlights);
                    if (flight.departure.original) {
                        sentenceElements = sentenceElements.concat(['來自', airportIATA2name(flight.departure.original.iata), '經由', airportIATA2name(flight.departure.iata)]);
                    } else {
                        sentenceElements = sentenceElements.concat(['來自', airportIATA2name(flight.departure.iata)]);
                    }
                    if (flight.arrival.belt) {
                        sentenceElements = sentenceElements.concat(['行李轉盤', flight.arrival.belt]);
                    }
                    if (SETTINGS.SHOW_AIRCRAFT && flight.aircraft) {
                        sentenceElements = sentenceElements.concat([emojiDict.plane, typeof flight.aircraft === 'string' ? flight.aircraft : flight.aircraft.iata]);
                    }
                    annocements.push(sentenceElements.join(" "));
                });
                postPlurkWithTime(annocements, 'has');
            });
        });
    },
    departure: function() {
        aviation.getFlights({
            dep_iata: 'tpe',
            //flight_status: 'scheduled', //scheduled, active, landed, cancelled, incident, diverted
        }, (data) => {
            if (!data) {
                return
            }
            taoyuanAirport.getFlights((taoyuanData) => {
                const flights = data.data.filter((flight) => {
                    return filterFlightTimeWindow(flight, 'departure');
                });
                const annocements = [];
                const flightsMergedCodeshares = getUniqueFlightsMergedCodeshares(flights);
                checkedByTaoYuan(taoyuanData, flightsMergedCodeshares);
                flightsMergedCodeshares.forEach((flight) => {
                    if ((!SETTINGS.SHOW_CANCELLED) && flight.flight_status === 'cancelled') {
                        return;
                    }
                    const simpleTime = new Date(flight.departure.estimated);
                    const simpleTimeStr = timeToDisplay(simpleTime.getUTCHours(), simpleTime.getUTCMinutes());
                    const airlineName = airlineIATA2name(flight.airline.iata);
                    if (flight.flight_status.match(/scheduled|active/)) {
                        let isPassenger = flight.isPassenger !== undefined ? flight.isPassenger : isThisFlightPassenger(flight);
                        let sentenceElements = [emojiDict.departure, emojiDict.getIsPassenger(isPassenger), simpleTimeStr];
                        let allSharedFlights = [airlineName, flight.flight.iata];
                        if (flight.flight.aka) {
                            flight.flight.aka.forEach((sharedFlight) => {
                                allSharedFlights.push(airlineIATA2name(sharedFlight.airline.iata));
                                allSharedFlights.push(sharedFlight.flight.iata);
                            });
                        }
                        sentenceElements = sentenceElements.concat(allSharedFlights);
                        if (flight.arrival.original) {
                            sentenceElements = sentenceElements.concat(['飛往', airportIATA2name(flight.arrival.original.iata), '經由', airportIATA2name(flight.arrival.iata)]);
                        } else {
                            sentenceElements = sentenceElements.concat(['飛往', airportIATA2name(flight.arrival.iata)]);
                        }
                        if (isPassenger) {
                            if (flight.departure.counter) {
                                sentenceElements = sentenceElements.concat(['櫃檯', flight.departure.counter]);
                            }
                            if (flight.departure.gate) {
                                sentenceElements = sentenceElements.concat(['登機門', flight.departure.gate]);
                            }
                        }
                        if (SETTINGS.SHOW_AIRCRAFT && flight.aircraft) {
                            sentenceElements = sentenceElements.concat([emojiDict.plane, typeof flight.aircraft === 'string' ? flight.aircraft : flight.aircraft.iata]);
                        }
                        annocements.push(sentenceElements.join(' '));
                    } else if (flight.flight_status === 'cancelled') {
                        let sentenceElements = [emojiDict.departure, emojiDict.forbidden, simpleTimeStr, airlineName, flight.flight.iata];
                        if (flight.arrival.original) {
                            sentenceElements = sentenceElements.concat(['飛往', airportIATA2name(flight.arrival.original.iata), '經由', airportIATA2name(flight.arrival.iata)]);
                        } else {
                            sentenceElements = sentenceElements.concat(['飛往', airportIATA2name(flight.arrival.iata)]);
                        }
                        annocements.push(sentenceElements.join(' '));
                    }
                });
                annocements.reverse();
                postPlurkWithTime(annocements, 'will');
            });
        });
    },
};

if (process.argv.length < 3 || (!taskRouter[process.argv[2]])) {
    console.error('Usage:', process.argv[0], process.argv[1], Object.keys(taskRouter).join('|'), '[debug]');
    return -1;
}

taskRouter[process.argv[2]]();
