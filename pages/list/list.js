// pages/list/list.js
const req = require('../../utils/request.js')

Page({

  //输入框函数
  input: function() {
    wx.redirectTo({
      url: '../schcity/schcity'
    })
  },

  //点击查看房屋详情
  btn2: function(e) {
    // console.log(e)
    //房间id
    var House_id = e.currentTarget.dataset.item.House_id;
    //房间类型（两室一厅..）
    var Houser_Type = e.currentTarget.dataset.item.Houser_Type;
    //房间价格
    var House_Price = e.currentTarget.dataset.item.House_Price;
    //房间评分
    var House_pf = e.currentTarget.dataset.item.House_pf;
    //房间名字
    var Houser_name = e.currentTarget.dataset.item.Houser_name;
    //房间宜住几人
    var Houser_Bed = e.currentTarget.dataset.item.Houser_Bed;
    //房间大小
    var House_square = e.currentTarget.dataset.item.House_square;
    //大床信息
    var Houser_Bed_size = e.currentTarget.dataset.item.Houser_Bed_size;
    //房间城市
    var Ctiy_name = e.currentTarget.dataset.item.Ctiy_name;
    console.log(House_id, Houser_Type, House_Price, House_pf, Houser_name, Houser_Bed, House_square, Houser_Bed_size, Ctiy_name);
    // 将起始页面里面的参数传递给目标页面
    // 传递的过程里面，可以使用路由传值
    wx.navigateTo({
      url: '../houseDetails/houseDetails?&House_id=' + House_id + '&Houser_Type=' + Houser_Type + '&House_Price=' + House_Price + '&House_pf=' + House_pf + '&Houser_name=' + Houser_name + '&Houser_Bed=' + Houser_Bed + '&House_square=' + House_square + '&Houser_Bed_size=' + Houser_Bed_size
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    city: '成都',
    title: '成都',
    images1: [{
      url: 'http://staticnew.mayi.com/duanzu/resourcesWap/common/images/common_icon.png'
    }],
    images2: [{
      url1: 'http://i1.mayi.com/mayi41/M72/SZ/EK/XYF4HNG2MXMPX6XA2J4GL5LY34ZK3E.jpg',
    }],
    text2: [{
        text1: '优选'
      },
      {
        url: 'http://staticnew.mayi.com/duanzu/resourcesWap/lodgeunitList/images/dibiao_icon.png'
      }
    ],
    data: [],
    startTime: '',
    endTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    let city = options.city;
    let startTime = options.startTime;
    let endTime = options.endTime;
    this.setData({
      city,
      startTime,
      endTime
    })

    req.myget('http://120.77.213.16/index/citySearchTime', {
      'citySearch': this.data.city,
      'startTime': this.data.startTime,
      'endTime': this.data.endTime
    }, this, (res) => {
      wx.hideLoading()
      if (res.code == 200) {
        this.setData({
          data: res.data
        })
      }
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
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    req.myget('http://120.77.213.16/index/citySearchTime', {
      'citySearch': this.data.city,
      'startTime': this.data.startTime,
      'endTime': this.data.endTime
    }, this, (res) => {
      wx.hideLoading()
      if (res.code == 200) {
        this.setData({
          data: res.data
        })
      }
    })
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

  },
})