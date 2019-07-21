import $ from 'jquery'
import { constants } from 'os'

export default {
  getEvents: function (Date1, Date2) {
    var urll = 'http://173.212.224.161/booking/server/api/events/Events'
    var userDataObj = {
      date_start: Date1,
      date_end: Date2
    }

    $.ajax({
      url: urll,
      type: 'get',
      dataType: 'json',
      data: userDataObj,
      success: response => {
        // result = $.parseJSON(response);
        console.log(response)
      },
      error: function (response) {
        $('#result_form').html('Ошибка. Данные EvDay не отправлены.')
      }
    })
    debugger
    return false
  }
}
