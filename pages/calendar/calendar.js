// pages/calendar/calendar.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: '',
    month: '',
    houseid:0
  },
  getCalendarData(e) { // 监听日历数据
    console.log(e.detail)
    // this.setData({
    //   currentYear: e.detail.currentYear,
    //   currentMonth: e.detail.currentMonth
    // })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    this.setData({
      year,
      month,
			houseid: options.houseid
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})