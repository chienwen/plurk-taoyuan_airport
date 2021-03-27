const taoyuanAirport = require('./lib/taoyuanAirport');
const airlineIATA2name = require('./lib/airlineIATA2name');
const airportIATA2name = require('./lib/airportIATA2name');
const tsNow = (new Date()).getTime();
//const logError = require('./lib/logError');

const SETTINGS = {
    SHOW_AIRCRAFT: true,
    SHOW_CANCELLED: false,
    TIME_WINDOW_HR: 1,
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

function getTimeStrInCST(dObj) {
    const t = new Date(dObj.getTime() + 3600000 * 8);
    return timeToDisplay(t.getUTCHours(), t.getUTCMinutes());
}

function timeToDisplay(hour, minute) {
    return twoDigits(hour) + ':' + twoDigits(minute);
}

let taoyuanDataCache;
function getTaoyuanDataArray(filter, cb) {
    function manipulateToArray(taoyuanData) {
        const actualFlightDict = {};
        Object.keys(taoyuanData).forEach((dataKey) => {
            let flight = taoyuanData[dataKey];
            if (filter(flight)) {
                flight.iata = flight.airline_iata + flight.flight_no;
                let aKey = flight.type + '_' + flight.location_iata + '_' + flight.scheduled.toISOString() + '_' + (flight.gate || flight.belt || flight.iata);
                if (!actualFlightDict[aKey]) {
                    actualFlightDict[aKey] = []
                }
                actualFlightDict[aKey].push(flight);
            }
        });
        const res = []
        Object.keys(actualFlightDict).forEach((dataKey) => {
            const actualFlights = actualFlightDict[dataKey];
            if (actualFlights.length === 1) {
                res.push(actualFlights[0]);
            } else {
                let minFlightNo = 99999999;
                let mainIata = null;
                actualFlights.forEach((flight) => {
                    if (flight.flight_no / 1 < minFlightNo) {
                        minFlightNo = flight.flight_no / 1;
                        mainIata = flight.iata;
                    }
                });
                const mainFlight = actualFlights.filter(flight => flight.iata === mainIata)[0];
                mainFlight.shares = [];
                actualFlights.filter(flight => flight.iata !== mainIata).forEach((flight) => {
                    mainFlight.shares.push(flight);
                });
                res.push(mainFlight);
            }
        });
        res.sort((a, b) => {
            return b.estimated - a.estimated;
        });
        return res;
    }
    if (taoyuanDataCache) {
        cb(manipulateToArray(Object.assign({}, taoyuanDataCache)));
    } else {
        taoyuanAirport.getFlights((taoyuanData) => {
            taoyuanDataCache = taoyuanData;
            cb(manipulateToArray(Object.assign({}, taoyuanData)));
        });
    }
}

const taskRouter = {
    all: function() {
        Object.keys(this).filter(task => task !== 'all').forEach((task) => {
            console.log('Invoke task', task);
            taskRouter[task]();
        });
    },
    departure_arrival: function() {
        taskRouter.departure();
        taskRouter.arrival();
    },
    arrival: function() {
        getTaoyuanDataArray((flight) => {
            const tsDiff = tsNow - flight.estimated.getTime();
            return flight.type === 'arrival' && tsDiff > 0 && tsDiff <= 3600000 * SETTINGS.TIME_WINDOW_HR && !flight.status.match(/CANCELLED/);
        }, (taoyuanData) => {
            const annocements = [];
            taoyuanData.forEach((flight) => {
                const cstTimeStr = getTimeStrInCST(flight.estimated);
                const airlineName = airlineIATA2name(flight.airline_iata);
                let sentenceElements = [emojiDict.arrival, emojiDict.getIsPassenger(flight.isPassenger) , cstTimeStr];
                let allSharedFlights = [airlineName, flight.iata];
                if (flight.shares) {
                    flight.shares.forEach((sharedFlight) => {
                        allSharedFlights.push(airlineIATA2name(sharedFlight.airline_iata));
                        allSharedFlights.push(sharedFlight.iata);
                    });
                }
                sentenceElements = sentenceElements.concat(allSharedFlights);
                if (flight.location_other_iata) {
                    sentenceElements = sentenceElements.concat(['來自', airportIATA2name(flight.location_other_iata), '經由', airportIATA2name(flight.location_iata)]);
                } else {
                    sentenceElements = sentenceElements.concat(['來自', airportIATA2name(flight.location_iata)]);
                }
                if (flight.belt) {
                    sentenceElements = sentenceElements.concat(['行李轉盤', flight.belt]);
                }
                if (SETTINGS.SHOW_AIRCRAFT && flight.aircraft) {
                    sentenceElements = sentenceElements.concat(['機型', flight.aircraft]);
                }
                annocements.push(sentenceElements.join(" "));
            });
            postPlurkWithTime(annocements, 'has');
        });
    },
    departure: function() {
        getTaoyuanDataArray((flight) => {
            const tsDiff = flight.estimated.getTime() - tsNow;
            return flight.type === 'departure' && tsDiff > 0 && tsDiff <= 3600000 * SETTINGS.TIME_WINDOW_HR && !flight.status.match(/CANCELLED/);
        }, (taoyuanData) => {
            const annocements = [];
            taoyuanData.forEach((flight) => {
                const cstTimeStr = getTimeStrInCST(flight.estimated);
                const airlineName = airlineIATA2name(flight.airline_iata);
                let sentenceElements = [emojiDict.departure, emojiDict.getIsPassenger(flight.isPassenger), cstTimeStr];
                let allSharedFlights = [airlineName, flight.iata];
                if (flight.shares) {
                    flight.shares.forEach((sharedFlight) => {
                        allSharedFlights.push(airlineIATA2name(sharedFlight.airline_iata));
                        allSharedFlights.push(sharedFlight.iata);
                    });
                }
                sentenceElements = sentenceElements.concat(allSharedFlights);
                if (flight.location_other_iata) {
                    sentenceElements = sentenceElements.concat(['飛往', airportIATA2name(flight.location_other_iata), '經由', airportIATA2name(flight.location_iata)]);
                } else {
                        sentenceElements = sentenceElements.concat(['飛往', airportIATA2name(flight.location_iata)]);
                }
                if (flight.isPassenger) {
                    if (flight.counter) {
                        sentenceElements = sentenceElements.concat(['航廈', flight.terminal]);
                        sentenceElements = sentenceElements.concat(['櫃檯', flight.counter]);
                    }
                    if (flight.gate) {
                        sentenceElements = sentenceElements.concat(['登機門', flight.gate]);
                    }
                }
                if (SETTINGS.SHOW_AIRCRAFT && flight.aircraft) {
                    sentenceElements = sentenceElements.concat(['機型', flight.aircraft]);
                }
                annocements.push(sentenceElements.join(' '));
            });
            postPlurkWithTime(annocements, 'will');
        });
    },
    clean: function() {
        plurk.callAPI('/APP/Timeline/getPlurks', {
            offset: (new Date(tsNow - 86400000)).toISOString().split('.')[0]
        }, (err, data) => {
            if (err) {
                console.log('ERROR', err);
            } else {
                if (data.plurks) {
                    data.plurks.forEach((pl) => {
                        const id = pl.plurk_id;
                        plurk.callAPI('/APP/Timeline/plurkDelete', {
                            plurk_id: id
                        }, (err, data) => {
                            console.log("ok, deleted", id, data);
                        });
                    });
                }
                else {
                    console.log('Nothing to delete');
                }
            }
        });
    },
};

if (process.argv.length < 3 || (!taskRouter[process.argv[2]])) {
    console.error('Usage:', process.argv[0], process.argv[1], Object.keys(taskRouter).join('|'), '[debug]');
    return -1;
}

taskRouter[process.argv[2]]();
