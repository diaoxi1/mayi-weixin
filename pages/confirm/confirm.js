var app = getApp();
console.log(app.globalData)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bg: true,
    house_photo: "",
    house_info: "",
    house_type: "",
    house_bed: "",
    array: ['1套', '2套', '3套', '4套'],
    objectArray: [
      {
        id: 1,
        name: '1套'
      },
      {
        id: 2,
        name: '2套'
      },
      {
        id: 3,
        name: '3套'
      },
      {
        id: 4,
        name: '4套'
      }
    ],
    more_people: 6,//最多住的人数
    index: 0, //选择房源数组的下标
    house_count: 0, //获取房源数据
    people_count: "",//获取入住人数
    name: '', //联系人姓名
    tel: '',//获取手机号
    checkname: '',//获取入住姓名
    id: '', //身份证
    isFold: true, //判断箭头
    arrow: ["http://staticnew.mayi.com/resourcesWap/ordersubmit/images/arrowUp.png", "http://staticnew.mayi.com/resourcesWap/ordersubmit/images/arrowD.png"], //箭头的两张图片
    selectedFlag: [false],  //select


    totalday: '', //住的天数
    price:'',
    totalprice: "", //房屋金额
    newdayarray: '',  //住的天数的数组
    dayarray_len: '', //天数数组长度
    new_len: '', //新天数数组长度
    in_time: '',
    leave_time: ''
  },
  bindPickerChange(e) { //选择套数的改变
    this.setData({
      index: e.detail.value,
      house_count: parseInt(e.detail.value) + 1
    })
  },
  changeToggle(e) {  //房屋总额下边的显示与隐藏
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    this.setData({
      isFold: !this.data.isFold,
      selectedFlag: this.data.selectedFlag
    })
  },
  peopleInput(e) {  //获取入住人数信息
    this.setData({
      people_count: e.detail.value,
      length: e.detail.value.length
    })
    console.log(this.data.people_count, this.data.people_count.length)
  },
  peopleBlur(e) { //输入人数之后进行校验
    if (this.data.people_count.length > 0) {
      if (this.data.people_count > this.data.more_people) {
        wx.showToast({
          title: '人数超过限定',
          icon: "none",
          duration: 1500
        })
      }
    }
  },
  contactNameInput(e) {  //获取联系人信息
    this.setData({
      name: e.detail.value,
      length: e.detail.value.length
    })
  },
  contactNmaeBlur(e) { //输入联系人与姓名之后的校验
    if (this.data.name.length > 0) {
      if (!(/^[\u4e00-\u9fa5]{2,4}$/.test(this.data.name))) {
        wx.showToast({
          title: '联系人有误',
          icon: "none",
          duration: 1500
        })
      }
    }
  },
  telInput(e) {  //获取手机号等信息
    this.setData({
      tel: e.detail.value,
      length: e.detail.value.length
    })
    console.log(this.data.tel)
  },
  telBlur(e) {  //手机号输入的校验
    if (this.data.tel.length > 0) {
      if (!(/^1[34578]\d{9}$/.test(this.data.tel))) {
        wx.showToast({
          title: '手机号码有误',
          icon: "none",
          duration: 1500
        })
      }
    }
  },
  checkNameInput(e) {  //获取姓名信息
    this.setData({
      checkname: e.detail.value,
      length: e.detail.value.length
    })
    console.log(this.data.name)
  },
  checkNameBlur(e) {  //输入姓名后的校验
    if (this.data.checkname.length > 0) {
      if (!(/^[\u4e00-\u9fa5]{2,4}$/).test(this.data.checkname)) {
        wx.showToast({
          title: '姓名有误',
          icon: "none",
          duration: 1500
        })
      }
    }
  },
  checkIdInput(e) { //获取身份证
    this.setData({
      id: e.detail.value,
      length: e.detail.value.length
    })
  },
  checkIdBlur(e) { //收入身份证之后的校验
    if (this.data.id.length > 0) {
      if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.id))) {
        wx.showToast({
          title: '身份证号码有误',
          icon: "none",
          duration: 1500
        })
      }
    }
  },

  go: function () {  //跳转
    console.log(this.data.totalprice)
    let _this = this
    console.log(this.data)
    if (app.globalData.token) {
      if (this.data.people_count == "" || this.data.name == "" || this.data.tel == "" || this.data.checkname == "" || this.data.id == "") {
        wx.showModal({
          title: '提示',
          content: '请填写完整信息',

          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
      else if (_this.data.people_count > _this.data.more_people || !(/^[\u4e00-\u9fa5]{2,4}$/.test(_this.data.name)) || !(/^1[34578]\d{9}$/.test(_this.data.tel)) || !(/^[\u4e00-\u9fa5]{2,4}$/).test(_this.data.checkname) || !(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(_this.data.id))) {
        wx.showModal({
          title: '提示',
          content: '输入内容有误',
        })
      }
      else {
        wx.request({
          url: 'http://120.77.213.16/order/added',
          method: 'post',
          data: {
            token: app.globalData.token,//用户存储的token
            order: {
              house_id: '1',//房间id
              check_count: _this.data.people_count,//入住人数
              contact_name: _this.data.name,//联系人姓名
              contact_tel: _this.data.tel,//联系人电话
              check_name: _this.data.checkname,//入住人姓名
              check_ID: _this.data.id,//入住人身份证信息
              check_time: _this.data.in_time,//入住时间
              outCheck_time: _this.data.leave_time,//离店时间
              Price:_this.data.price
            }
          },

          success: function (res) {
            if (res.data.code == 200) {
              wx.showToast({
                title: '提交中',
                icon: 'loading',
                duration: 2000
              })
              wx.navigateTo({
                url: '../../pages/pay/pay?totalprice=' + _this.data.totalday * _this.data.price
              })
            }
          },
          fail: function () { //失败执行
            wx.showToast({
              title: "提交失败",
              icon: 'loading',
              duration: 2000
            })
          },
          complete: function () { //请求完成执行
            // setTimeout(function () {
            //   wx.hideLoading()
            // }, 20000)

          }
        })
      }
    }

    else {
      wx.showModal({
        title: '提示',
        content: '请登录',
      })
      //  wx.navigateTo({  //跳登录
      //    url: '',
      //  })
    }

  },  //go:function 结束

  //计算日期

  //将字符串类型的日期格式转为Date对象，方便计算
  getDate(datestr) {
    var temp = datestr.split("-");
    if (temp[1] === '01') {   //判断月份
      temp[0] = parseInt(temp[0], 10) - 1;
      temp[1] = '12';
    }
    else {
      temp[1] = parseInt(temp[1], 10) - 1;
    }
    //new Date()的月份入参实际都是当前值-1
    var date = new Date(temp[0], temp[1], temp[2]);
    return date;
  },
  /*
  获取两个日期间的所有日期
  默认start<end
  */
  getDiffDate(start, end) {
    var startTime = this.getDate(start);
    var endTime = this.getDate(end);
    console.log(startTime.getTime()) //返回距 1970 年 1 月 1 日之间的毫秒数
    var dateArr = [];//用来存放日期的数组
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
      var year = startTime.getFullYear(); //算出日期之间有多少个年
      //小于10的月份前面+个0
      //日 同理
      var month = startTime.getMonth().toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1) : (startTime.getMonth() + 1);
      var day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
      //拼接之后存入数组
      dateArr.push(year + "-" + month + "-" + day);
      startTime.setDate(startTime.getDate() + 1);
    }
    return dateArr;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    console.log(options)
    //根据id拿图,与描述
    let house_id=options.House_id
    wx.request({
      url: 'http://120.77.213.16/index/info',
      data:{
        House_id:house_id
      },
      success:function(res){
        console.log(res)
        let photo=res.data.houseImg[0].img_url
        let house_info = res.data.housedescribe.describe_Text.substring(0,10)
        console.log(house_info)
        _this.setData({
          house_photo: 'http://120.77.213.16'+photo,
          house_info:house_info
        })
      }
    })
    //改变传过来的房屋信息与房屋类型等
    let house_type = options.Houser_Type
    let house_bed  =options.Houser_Bed
    console.log(house_bed)
    //改变传过来的日期的格式
    // let oldthisday = options.thisday.split('日')[0]
    // let oldthatday = options.thatday.split('日')[0]
    // let thisday = oldthisday.replace(/[^\d]/g, '-') //利用正则改格式   //入住的日子
    // let thatday = oldthatday.replace(/[^\d]/g, '-')  //离开的日子
    function insertStr(old, start, newStr) { //old为原字符串,start为将要插入字符的位置，newStr为要插入的字符
      return newStr + old.slice(start);
    }
    let thisday=options.nowDateTime
    let thatday=options.tomDateTime
    // let newthisday = insertStr(thisday, '0', '2019-')  //给日期增加‘2019-’
    // let newthatday = insertStr(thatday, '0', '2019-')


    //根据传过来的入住时间与离开时间，计算共有几晚与详细信息 （房屋总额处显示）
    let in_time = thisday //住的天数的第一天
    let leave_time = thatday  //住的天数的最后一天
    console.log(in_time, leave_time)
    let datearr = _this.getDiffDate(in_time, leave_time)  //获取入住第一天跟最后一天之间的日期（不包括最后一天）
    let dayarr = []
    let price = options.price //住的天数的单价
    for (var i = 0; i < datearr.length; i++) {  //将第一天与最后一天之间的日期全部循环输出并添加到新数组中
      var obj = {};
      obj.day = datearr[i];
      obj.price = price;
      obj.count = 1
      dayarr.splice(0, 0, obj);
    }
    dayarr.reverse()  //将新数组倒序排列，达到按日期顺序排列
    console.log(dayarr)
    let new_len = dayarr.length  //住的天数的数组长度
    let start_date = new Date(dayarr[0].day.replace(/-g/, "/")) //转成JS那种才能计算天数之间的差
    let end_date = new Date(dayarr[new_len - 1].day.replace(/-g/, "/"))
    let day = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))  //计算共有几晚
    let totalprice = price * day //总额
    _this.setData({
      //房屋信息与类型
      house_type: house_type,
      house_bed: house_bed,
      //入住时间离开时间以及房屋总额显示的时间等内容
      totalday: day,
      price: price,
      totalprice: totalprice,
      in_time: in_time,
      leave_time: leave_time,
      newdayarray: dayarr,
      new_len: new_len,
      in_time: dayarr[0].day,
      leave_time: dayarr[new_len - 1].day
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