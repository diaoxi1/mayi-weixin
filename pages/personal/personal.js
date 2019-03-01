// pages/personal/personal.js
const app = getApp()
var util = require('../../utils/util.js'); //引入时间模块
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoimg: 'http://img.027cgb.com/615308/personal01_131928702264233750.png',
    loginStatus: '登录/注册',
    showMethod:'none',
    date:0,
  },
  //登录/注册
  hasLogin:function(e){
    app.globalData.personalList = e.currentTarget.dataset.infotxt;
    this.judgeLogin();
    
  },
  //退出登录
  loginOut:function(){
    var _this=this;
    wx.showModal({
      title: '提示',
      content: '请确认是否退出登录',
      success(res) {
        if (res.confirm) {
          app.globalData.loginCode=0;
          app.globalData.orderinfo=[];
          _this.setData({
            // userInfo:{},
            loginStatus: "登录/注册",
            logoimg: 'http://img.027cgb.com/615308/personal01_131928702264233750.png',
            showMethod: "none",
          })
          // console.log(app.globalData)
        } 
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //封装的判断是否登录的函数
  judgeLogin:function(){
    if (app.globalData.loginCode == 0) {
      wx.navigateTo({
        url: '../login/login',
      })
}
  },
  //我的订单
  myorder:function(e){
    // console.log(e);
    if (this.data.loginStatus!="登录/注册"){
    wx.request({
      url: 'http://120.77.213.16/order/userAllOrder?token=' + app.globalData.token,
      method: 'post',
      success(res) {
        app.globalData.orderinfo = res.data.data
        // console.log(app.globalData.orderinfo)
        wx.switchTab({
          url: '../order/order',
        })
      }
    })
    }
    else{
      app.globalData.personalList = e.currentTarget.dataset.infotxt;
      wx.request({
        url: 'http://120.77.213.16/order/userAllOrder?token=' + app.globalData.token,
        method: 'post',
        success(res) {
          app.globalData.orderinfo = res.data.data
          // console.log(app.globalData.orderinfo)
        }
      })
      this.judgeLogin()
    }
  },
  //意见反馈
  gotoSgt:function(e){
    if (this.data.loginStatus != "登录/注册") {
      wx.navigateTo({
        url: '../feedback/feedback',
      })
    }
    else{
      app.globalData.personalList = e.currentTarget.dataset.infotxt;
      this.judgeLogin()
    }
  },
  gotokefu:function(){
    // if (this.data.loginStatus != "登录/注册") {
      wx.makePhoneCall({
        phoneNumber: '440-028-6868' //客服电话
      })
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
    // console.log(app.globalData)
    if (app.globalData.loginCode != 0) {
      // console.log(app.globalData)
      this.setData({
        logoimg: app.globalData.userInfo.avatarUrl,
        loginStatus: app.globalData.userInfo.nickName,
      })
      }
    // console.log(this.data.loginStatus)
    if (this.data.loginStatus !='登录/注册'){
      this.setData({
        showMethod: 'block',
      })
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