export default {
  timeStampYMD: time => { // 时间戳转时间
    const date = new Date(time * 1000)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate()
    if (D < 10) {
      D = '0' + D
    }
    return Y + M + D
  },
  strtotime: time => { // 字符串 时间（YYYY-MM-dd）转 时间戳(秒) date= 2018-10-30
    const f = time.split(' ', 2)
    const d = (f[0] ? f[0] : '').split('-', 3)
    const t = (f[1] ? f[1] : '').split(':', 3)
    return (new Date(
      parseInt(d[0], 10) || null,
      (parseInt(d[1], 10) || 1) - 1,
      parseInt(d[2], 10) || null,
      parseInt(t[0], 10) || null,
      parseInt(t[1], 10) || null,
      parseInt(t[2], 10) || null
    )).getTime() / 1000
  },
  timeStampYMDHMS: time => { // 秒数转年：月：日 时：分：秒
    const date = new Date(time * 1000)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() + ' '
    const h = (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':'
    const m = (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ':'
    let s = date.getSeconds()
    if (D < 10) {
      D = '0' + D
    }
    if (s < 10) {
      s = '0' + s
    }
    return Y + M + D + h + m + s
  },
  timeStampYMDHM: time => {
    const date = new Date(time * 1000)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() + ' '
    const h = (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':'
    const m = (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes())
    if (D < 10) {
      D = '0' + D
    }
    return Y + M + D + h + m
  },
  time: index => { // 时间转时间戳
    const strtime = index
    const date = new Date(strtime)
    const time = Date.parse(date) / 1000
    return time
  },
  newDate: () => { // 获取当前时间 格式YYYY-MM-DD
    const date = new Date()
    const Y = date.getFullYear() + '-'
    let M = date.getMonth() + 1 + '-'
    let D = date.getDate() + ' '
    const h = (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':'
    const m = (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ':'
    const s = (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds())
    if (M >= 1 && M <= 9) {
      M = '0' + M
    }
    if (D >= 0 && D <= 9) {
      D = '0' + D
    }
    const currentdate = Y + M + D + h + m + s
    return currentdate
  },
  overMonth: val => { // 获取指定月份第一秒,最后一秒数
    const y = val.split('-')[0]
    const m = val.split('-')[1]
    const firstDay = new Date(y, m - 1, 1) / 1000
    const lastDay = new Date(y, m, 0) / 1000 + 86399
    const data_ = {
      firstDay: firstDay,
      lastDay: lastDay
    }
    return data_
  },
  firstDayAndLastDay: () => { // 获取当月第一秒和最后一秒
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth()
    const firstDay = new Date(y, m, 1).getTime() / 1000
    const lastDay = new Date(y, m + 1, 0).getTime() / 1000 + 86399
    const data_ = {
      firstDay: firstDay,
      lastDay: lastDay
    }
    return data_
  },
  getDateMonth: () => { // 获取今天的年月
    const date = new Date()
    const year = date.getFullYear()
    let M = date.getMonth() + 1
    if (M < 10) {
      M = '0' + M
    }
    return year + '年' + M + '月'
  },
  getDate: () => { // 获取今天的年月日
    const date = new Date()
    const year = date.getFullYear()
    let M = date.getMonth() + 1
    let day = date.getDate()
    if (M < 10) {
      M = '0' + M
    }
    if (day < 10) {
      day = '0' + day
    }
    return year + '年' + M + '月' + day + '日'
  }
}
