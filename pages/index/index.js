// pages/index/index.js
const req = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerSrc: [{
      'url': 'https://i1.mayi.com/mayi38/M94/SG/UV/4SSA2BGWC6889J4CNXU2J3SMP3S66S.jpg'
    }, {
      'url': 'https://i1.mayi.com/mayi42/M27/IU/XN/S9PBJE9FLF4DKJH9BJAV46BM39WEBE.jpg'
    }, {
      'url': 'https://i1.mayi.com/mayi79/M92/XJ/FH/BH4TBGXM6XK7PWLAB2QFFZB5FH5WDU.jpg'
    }, {
      'url': 'http://i1.mayi.com/mayi20/M40/VX/UJ/7LWHW7EPQRYWY3L3D9BS65HPRG632A.jpg'
    }],
    nowDate: '1月23日',
    tomDate: '1月24日',
    hotPlace: ['三亚', '北京', '上海', '香港'],
    hotItem: [],
    currentTab: 0,
    isBack: false,
    night: "1",
    nowCity: '北京',
    nowDateTime: '',
    tomDateTime: ''
  },
  clickTab(e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  //跳转房屋具体信息页面
  goHouseDeta(e) {
    let item = e.currentTarget.dataset.item
    let House_id = item.House_id
    let Houser_Type = item.Houser_Type
    let House_Price = item.House_Price
    let House_pf = item.House_pf
    let Houser_name = item.Houser_name
    let Houser_Bed = item.Houser_Bed
    let House_square = item.House_square
    let Houser_Bed_size = item.Houser_Bed_size
    wx.navigateTo({
      url: '../houseDetails/houseDetails?&House_id=' + House_id + '&Houser_Type=' + Houser_Type + '&House_Price=' + House_Price + '&House_pf=' + House_pf + '&Houser_name=' + Houser_name + '&Houser_Bed=' + Houser_Bed + '&House_square=' + House_square + '&Houser_Bed_size=' + Houser_Bed_size
    })
  },
  //跳转更多城市页面
  goMore(e) {
    wx.navigateTo({
      url: '../list/list?city=' + e.currentTarget.dataset.city
    })
  },
  //跳转日历页面
  goCale() {
    wx.navigateTo({
      url: '../calendar/calendar'
    })
  },
  //跳转搜索页面
  goSearch() {
    wx.navigateTo({
      url: `../list/list?city=${this.data.nowCity}&startTime=${this.data.nowDateTime}&endTime=${this.data.tomDateTime}`
    })
  },
  //调用定位获取当前所在城市
  localtion() {
    let that = this
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        // console.log(latitude, longitude)
        req.myget('https://apis.map.qq.com/ws/geocoder/v1', {
          'location': `${latitude},${longitude}`,
          'key': 'SGXBZ-6X3K6-NYLSF-MALZD-QC6PK-BABOS'
        }, this, (res) => {
          wx.hideLoading()
          if (res.message == "query ok") {
            let nowCity = res.result.address_component.city
            nowCity = nowCity.slice(0, nowCity.indexOf('市'))
            that.setData({
              nowCity
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取热门城市租房信息
    let that = this
    req.myget('http://120.77.213.16/index', {}, this, (res) => {
      wx.hideLoading()
      that.setData({
        hotPlace: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    if (currPage.data.isBack) {
      // console.log(currPage.data.nowDate, currPage.data.tomDate, currPage.data.isBack)
      let nowDay = currPage.data.nowDate.split('-')[2]
      let tomDay = currPage.data.tomDate.split('-')[2]
      let month = currPage.data.nowDate.split('-')[1]
      if (month.split("")[0] == 0) {
        month = month.split("")[1]
      }
      this.setData({
        nowDate: month + '月' + nowDay + '日',
        tomDate: month + '月' + tomDay + '日',
        night: tomDay - nowDay,
        nowDateTime: currPage.data.nowDate,
        tomDateTime: currPage.data.tomDate
      })
    }
    //调用定位
    this.localtion()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    currPage.setData({
      isBack: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // 下拉刷新
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    req.myget('http://120.77.213.16/index', {}, this, (res) => {
      if (res.code == 200) {
        wx.hideLoading()
        that.setData({
          hotPlace: res.data
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

  }
})