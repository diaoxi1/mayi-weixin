const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const list = (city, _this) => {
	wx.request({
		url: 'http://120.77.213.16/index/citySearch',
		data: {
			citySearch: city,
		},
		success(res) {
			_this.setData({
				data: res.data.data
			})
			// console.log(_this)
		}
	})
}

module.exports = {
  formatTime: formatTime,
	list:list,
  formatDate: formatDate
}
