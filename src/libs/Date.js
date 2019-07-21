
export function extractTime (DateTime) { return (typeof (DateTime) === 'string' ? DateTime.substr(11, 5) : '') } // time "2019-07-18 10:15:00".substr(11,5)    or   "2019-07-18 10:15:00".slice(11,16)

export function extractDate (DateTime) { return DateTime.substr(0, 10) } // date "2019-07-18 10:15:00".substr(0,10)    or   "2019-07-18 10:15:00".slice(0, 10)

function twoCh (val) {
  val = '0' + String(val)
  return val.substr(val.length - 2)
}

export function DataToSql (year, month, day, hour = 0, min = 0, sec = 0) {
  return '' + year + '-' + twoCh(month) + '-' + twoCh(day) + ' ' + twoCh(hour) + ':' + twoCh(min) + ':' + twoCh(sec)
}

export function DataToSql2 (year, month, day, time) {
  return '' + year + '-' + twoCh(month) + '-' + twoCh(day) + ' ' + time + ':00'
}

export function convertTime12to24 (time12h) {
  const [time, modifier] = time12h.split(' ')
  let [hours, minutes] = time.split(':')

  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12
  }

  return hours + ':' + minutes
}
// console.log(convertTime12to24('01:02 PM'));
// console.log(convertTime12to24('05:06 PM'));
// console.log(convertTime12to24('12:00 PM'));
// console.log(convertTime12to24('12:00 AM'));
