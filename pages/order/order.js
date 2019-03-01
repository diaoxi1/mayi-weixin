// pages/order/order.js
const app = getApp()
var util = require('../../utils/util.js'); //引入时间模块
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:[],
    checkIn:'',
    isLogin:false,
    nowTime:'2019-01-29'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //立即登录
  goLogin:function(e){
    app.globalData.personalList = e.currentTarget.dataset.infotxt
    wx.navigateTo({
      url: '../login/login',
    })
    wx.request({
      url: 'http://120.77.213.16/order/userAllOrder?token=' + app.globalData.token,
      method: 'post',
      success(res) {
        app.globalData.orderinfo = res.data.data
      }
    })
  },
  onLoad: function (options) {
    var nowDATE = util.formatDate(new Date());
    
    if (app.globalData.loginCode != 0 || app.globalData.confirmPay == 1){
      this.setData({
        nowTime: nowDATE,
        isLogin: true
      })
    }
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
    // console.log(this.data.orderinfo)
    if (app.globalData.loginCode == 0) {
      this.setData({
        isLogin: false,
        orderInfo: [],
      })
    }
    if (app.globalData.loginCode != 0 || app.globalData.confirmPay==1) {
      var _this=this;
      var nowDATE = util.formatDate(new Date());
      wx.request({
        url: 'http://120.77.213.16/order/userAllOrder?token=' + app.globalData.token,
        method: 'post',
        success(res) {
          app.globalData.orderinfo = res.data.data;
          // console.log(app.globalData.orderinfo)
         
          // console.lo(nowDATE.getTime())
          var i;
          _this.setData({
            orderInfo: app.globalData.orderinfo,
            // isLogin: true,
          })
       
        }
      })
      // console.log(this.data.isLogin)
      _this.setData({
        isLogin: true,
        nowTime: nowDATE,
      })
      // console.log(this.data.isLogin)
    }
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