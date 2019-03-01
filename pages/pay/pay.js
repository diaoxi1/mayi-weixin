// pages/pay/pay.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    id: "",
    in_time: '',
    leave_time: '',
    totalprice: "",
    status: '', //订单状态
    order_id: '' //订单号
  },
  gopay: function () {
    app.globalData.confirmPay=1;
    // console.log(app.globalData);
    console.log(this.data.totalprice)
    let _this = this
    wx.request({
      url: 'http://120.77.213.16/order/Shopping',
      method: 'post',
      data: {
        token: app.globalData.token,//用户存储的token
        Price: _this.data.totalprice,
        order_id: _this.data.order_id
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '支付中',
            icon: 'loading',
            duration: 2000
          })
        wx.switchTab({
          url: '../order/order',
        })
        }
      },
      fail: function () { //失败执行
        wx.showToast({
          title: "提交失败",
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let _this = this
    let totalprice = options.totalprice
    _this.setData({
      totalprice: totalprice
    })
    wx.request({
      url: 'http://120.77.213.16/order/newOrder',
      method: 'post',
      data: {
        token: app.globalData.token,//用户存储的token
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.data[0].contact_name)
        let totalprice = options.totalprice
        _this.setData({
          name: res.data.data[0].contact_name,
          id: res.data.data[0].check_ID,
          in_time: res.data.data[0].check_time,
          leave_time: res.data.data[0].outCheck_time,
          status: res.data.data[0].order_state,
          order_id: res.data.data[0].order_id
        })
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})