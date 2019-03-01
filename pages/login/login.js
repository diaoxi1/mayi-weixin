// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  //点击微信logo登录
goLogin:function(){
  var _this = this
  wx.login({//调用微信登录接口获取 code 发送到后台换取 token
    success: function (res) {
      if (res.code) {
        var code = res.code;
        app.globalData.loginCode = code;
        // 获取用户的头像各种信息
        wx.getUserInfo({
          success(res) {
            //res表示获取用户信息后得到的用户信息，包括用户名地址
            app.globalData.userInfo = res.userInfo
          }
        })
      }
    },
    fail: function (res) { //执行失败的方法
    },
    complete: function (res) {//执行结束的方法 
      if (app.globalData.personalList =='login'){
        wx.switchTab({
         url: '../personal/personal',
       })
      }
      else if (app.globalData.personalList == 'order'){
        app.globalData.currentTab=1
        wx.switchTab({
          url: '../order/order',
        })
      }
      else if (app.globalData.personalList == 'suggest')
      {
        wx.navigateTo({
          url: '../feedback/feedback',
        })
      }
      else if (app.globalData.personalList == 'imelogin') {
       wx.switchTab({
         url: '../order/order',
       })
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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