import config from './config'

function Objday (name, date, weekeend, alienday) {
  this.date = date
  this.name = name
  this.weekeend = weekeend
  this.alienday = alienday
  this.events = []
}

export default function Calendar () {
  this.curData = new Date()
  this.month = 0
  this.strmonth = ''
  this.listDay = {}
  this.getListDay = function () {
    var weekday; var dat; var offSet; var weekeend; var alienday; var arr = {}

    this.curData.setDate(1)
    this.month = this.curData.getMonth()
    this.strmonth = this.curData.toLocaleString(config.LOCALISATION, { month: 'long' }) + ' ' + this.curData.getFullYear()
    dat = this.curData.getDay()
    offSet = dat + (config.WEEKDAY_EU ? 6 : 0)
    this.curData.setDate(-(offSet > 7 ? offSet - 7 : offSet))
    for (let i = 1; i <= 42; i++) {
      this.curData.setDate(this.curData.getDate() + 1)
      dat = this.curData.getDay()

      weekeend = (dat === 0 || dat === 6 || config.HIGHDAY.includes(this.getStrDate(this.curData)))
      alienday = (this.month !== this.curData.getMonth())
      weekday = this.curData.toLocaleString(config.LOCALISATION, { weekday: config.VIEW_WEEKDAY })
      if (arr[weekday] === undefined) {
        arr[weekday] = []
      }
      arr[weekday].push(new Objday(this.curData.getDate(), this.curData.getTime(), weekeend, alienday))
      // arr[weekday][i]=this.curData.getDate();
    }
    for (let key in arr) {
      this.listDay[key] = arr[key]
    };
    // arr.splice(index[, deleteCount, elem1, ..., elemN])
    // this.listDay = arr;
  }
  this.getStrDate = function (dat) {
    return '' + (dat.getMonth() + 1) + '/' + dat.getDate() + '/' + dat.getFullYear()
  }
  this.addMonth = function (offset) {
    this.curData.setDate(1)
    this.curData.setMonth(this.month + offset)
    this.getListDay()
  }
}

;
