import config from './config'

function Objday (name, date, stat) {
  this.date = date
  this.name = name
  this.stat = stat
  this.task = ''
}

export default function Calendar () {
  this.curData = new Date()
  this.month = 0
  this.strmonth = ''
  this.listDay = {}
  this.getListDay = function () {
    var weekday; var dat; var offSet; var stat; var arr = {}

    this.curData.setDate(1)
    this.month = this.curData.getMonth()
    this.strmonth = this.curData.toLocaleString(config.LOCALISATION, { month: 'long' }) + ' ' + this.curData.getFullYear()
    dat = this.curData.getDay()
    offSet = dat + (config.WEEKDAY_EU ? 6 : 0)
    this.curData.setDate(-(offSet > 7 ? offSet - 7 : offSet))
    for (let i = 1; i <= 42; i++) {
      this.curData.setDate(this.curData.getDate() + 1)
      dat = this.curData.getDay()

      stat = (dat === 0 || dat === 6 ? config.STAT_WEEKEND : 0)
      stat = (config.HIGHDAY.includes(this.getStrDate(this.curData)) ? config.STAT_HIGHDAY : stat)
      stat = (this.month !== this.curData.getMonth() ? config.STAT_ALIENDAY : stat)
      weekday = this.curData.toLocaleString(config.LOCALISATION, { weekday: config.VIEW_WEEKDAY })
      if (arr[weekday] === undefined) {
        arr[weekday] = []
      }
      arr[weekday].push(new Objday(this.curData.getDate(), this.curData.getTime(), stat))
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
