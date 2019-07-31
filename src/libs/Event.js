export default function Objday (id_event, id, id_user, time_start, time_end, date_start = '') {
  this.date_start = date_start
  this.time_start = time_start
  this.time_end = time_end
  this.id = id
  this.id_event = id_event
  this.id_user = id_user
}
