// pages/schcity/schcity.js
const req = require('../../utils/request.js')
Page({


//点击搜索
  btn1: function (e) {
    // console.log(this)
    var city = this.data.city;
    wx.redirectTo({
      url: '../list/list?&city=' + city
    })
  },
  
  //输入框函数
  input: function (e) {
    this.setData({
      city: e.detail.value,
      title: e.detail.value
    })
  }, 

btn2:function(e){
  console.log(e.currentTarget.dataset.city)
  var city=e.currentTarget.dataset.city
  wx.navigateTo({
    url: '../list/list?&city=' + city 
  })
},

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    title: '',
      data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    req.myget('http://120.77.213.16/index/CityList', {}, this, (res) => {
      if (res.code == 200) {
        wx.hideLoading()
        this.setData({
          data: res.CityList
        })
      }
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