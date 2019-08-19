var moment = require('moment');

let previousTime = [{ start: "07:00", end: "09:30" }, { start: "16:00", end: "19:30" }];
let newTime = [{ start: "05:00", end: "20:00" }];

//validatePlateNumber('PDI-3528','12/09/2019', '15:00')
module.exports= function validatePlateNumber(plateNumber, date, time) {
    moment().weekday(0)
    try {
        if (validateFields(plateNumber, date, time)) {
            let lastDigit = getLastDigit(plateNumber);
            let blockDay = getBlockDay(lastDigit)
            
            let newDate = moment(date, "DD/MM/YYYY")
            timeMoment = moment(time, 'HH:mm');
            newDate.set({
                hour: timeMoment.get('hour'),
                minute: timeMoment.get('minute')
            })
            
            let dayNumber = newDate.day()
            if (dayNumber == blockDay){
                let restricted = false
                if (newDate.year() >= 2019 && newDate.month() >= 8 && newDate.date() >= 9) {
                    restricted = getNewBlockByTime(newDate.hour(), newDate.minute())
                }
                else{
                    restricted = getOldBlockByTime(newDate.hour(), newDate.minute())
                }
                    
    
                if (restricted) {
                    //console.log("Sorry, you have to walk or use public transport")
                    return "Sorry, you have to walk or use public transport"
                }
                else {
                    //console.log("You can drive")
                    return "You can drive";
                }
            }
            else{
                //console.log("You can drive")
                return "You can  drive"
            }
        } else {
            //console.log("Bad input parameters. Please correct and try again")
            return "Bad input parameters. Please correct and try again";
        }

    } catch (e) {
        console.error(e.error);
    }
}

function getOldBlockByTime(hour, minute) {
    let restriction = false
    try {
        previousTime.map(time => {
            let startTime = moment(time.start, 'HH:mm');
            let endTime = moment(time.end, 'HH:mm');
            let startHour = startTime.hour()
            let startMinute = startTime.minute()
            let endHour = endTime.hour()
            let endMinute = endTime.minute()
            let hourRestriction = (hour < startHour || hour > endHour) ? false : true
            let minuteRestriction = false
            if (hourRestriction) {
                if (hour === startHour) {
                    minuteRestriction = (minute >= startMinute) ? true : false
                } else if (hour === endHour) {
                    minuteRestriction = (minute <= startMinute) ? true : false
                }
                else
                    minuteRestriction = true
            }
            if (minuteRestriction && hourRestriction)
                restriction = true
        })
        return restriction;

    } catch (e) {
        console.error(e.error);
    }
}

function getNewBlockByTime(hour, minute) {
    let restriction = false
    try {
        newTime.map(time => {
            let startTime = moment(time.start, 'HH:mm');
            let endTime = moment(time.end, 'HH:mm');
            let startHour = startTime.hour()
            let startMinute = startTime.minute()
            let endHour = endTime.hour()
            let endMinute = endTime.minute()
            let hourRestriction = (hour < startHour || hour > endHour) ? false : true
            let minuteRestriction = false
            if (hourRestriction) {
                if (hour === startHour) {
                    minuteRestriction = (minute >= startMinute) ? true : false
                } else if (hour === endHour) {
                    minuteRestriction = (minute <= startMinute) ? true : false
                }
                else
                    minuteRestriction = true
            }
            if (minuteRestriction && hourRestriction)
                restriction = true
        })
        return restriction;

    } catch (e) {
        console.error(e.error);
    }
}

function getBlockDay(lastDigit) {

    try {
        let dayNumber;

        if (lastDigit == 1 || lastDigit == 2)
            dayNumber = 1;
        else if (lastDigit == 3 || lastDigit == 4)
            dayNumber = 2;
        else if (lastDigit == 5 || lastDigit == 6)
            dayNumber = 3;
        else if (lastDigit == 7 || lastDigit == 8)
            dayNumber = 4;
        else if (lastDigit == 9 || lastDigit == 0)
            dayNumber = 5;
        else
            dayNumber = null;
        return dayNumber;

    } catch (e) {
        console.error(e.error);
    }
}

function getLastDigit(plateNumber) {
    try {
        let lastDigit = parseInt(plateNumber.slice(-1), 10);
        return lastDigit;
    } catch (e) {
        console.error(e.error);
    }
}

function validateFields(plateNumber, date, time) {
    let timeRegEx = /^([01]\d|2[0-3]):?([0-5]\d)$/
    let plateRegEX = /^[A-Z]{3}-\d{4}$/;

    let validPlate = plateRegEX.test(plateNumber)
    let validDate = moment(date, "DD/MM/YYYY").isValid()

    let validTime = timeRegEx.test(time)
    return validPlate && validDate && validTime    
}