// components/calendar/calendar.js
const req = require('../../utils/request.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentYear: { // 当前显示的年
      type: Number,
      value: new Date().getFullYear()
    },
    currentMonth: { // // 当前显示的月
      type: Number,
      value: new Date().getMonth() + 1
    },
		houseid: { // // 当前显示的月
			type: Number,
			value: 1
		}
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentMonthDateLen: 0, // 当月天数
    preMonthDateLen: 0, // 当月中，上月多余天数
    allArr: [], // 当月所有数据
    selectIndex: [],
		houseid:''
  },
	ready() {
    this.getAllArr()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取某年某月总共多少天,用时间戳
    getDateLen(year, month) {
      let actualMonth = month - 1;
      let timeDistance = +new Date(year, month) - +new Date(year, actualMonth);
      return timeDistance / (1000 * 60 * 60 * 24);
    },
    // 获取某月1号是周几
    getFirstDateWeek(year, month) {
      return new Date(year, month - 1, 1).getDay()
    },
    // 上月 年、月
    preMonth(year, month) {
      if (month == 1) {
        return {
          year: --year,
          month: 12
        }
      } else {
        return {
          year: year,
          month: --month
        }
      }
    },
    // 下月 年、月
    nextMonth(year, month) {
      if (month == 12) {
        return {
          year: ++year,
          month: 1
        }
      } else {
        return {
          year: year,
          month: ++month
        }
      }
    },
    // 获取当月数据，返回数组
    getCurrentArr() {
      let currentMonthDateLen = this.getDateLen(this.data.currentYear, this.data.currentMonth) // 获取当月天数
      let currentMonthDateArr = [] // 定义空数组
      if (currentMonthDateLen > 0) {
        for (let i = 1; i <= currentMonthDateLen; i++) {
          currentMonthDateArr.push({
            month: 'current', // 只是为了增加标识，区分上下月
            date: i
          })
        }
      }
      this.setData({
        currentMonthDateLen
      })
      return currentMonthDateArr
    },
    // 获取当月中，上月多余数据，返回数组
    getPreArr() {
      let preMonthDateLen = this.getFirstDateWeek(this.data.currentYear, this.data.currentMonth) // 当月1号是周几 == 上月残余天数）
      let preMonthDateArr = [] // 定义空数组
      if (preMonthDateLen > 0) {
        let {
          year,
          month
        } = this.preMonth(this.data.currentYear, this.data.currentMonth) // 获取上月 年、月
        let date = this.getDateLen(year, month) // 获取上月天数
        for (let i = 0; i < preMonthDateLen; i++) {
          preMonthDateArr.unshift({ // 尾部追加
            month: 'pre', // 只是为了增加标识，区分当、下月
            date: ''
          })
          // date--
        }
      }
      this.setData({
        preMonthDateLen
      })
      return preMonthDateArr
    },
    // 获取当月中，下月多余数据，返回数组
    getNextArr() {
      let nextMonthDateLen = 42 - this.data.preMonthDateLen - this.data.currentMonthDateLen // 下月多余天数
      let nextMonthDateArr = [] // 定义空数组
      if (nextMonthDateLen > 0) {
        for (let i = 1; i <= nextMonthDateLen; i++) {
          nextMonthDateArr.push({
            month: 'next', // 只是为了增加标识，区分当、上月
            date: ''
          })
        }
      }
      return nextMonthDateArr
    },
    // 整合当月所有数据
    getAllArr() {
      let preArr = this.getPreArr()
      let currentArr = this.getCurrentArr()
      let nextArr = this.getNextArr()
      let allArr = [...preArr, ...currentArr, ...nextArr]
      //抹掉当前天数之前的天数
      if (this.data.currentYear == new Date().getFullYear() && this.data.currentMonth == new Date().getMonth() + 1) {
        for (let i = 0; i < new Date().getDate() + 1; i++) {
          allArr[i].befor = 'befor'
        }
        //把当前日期修改为‘今天’字符串
        // allArr[new Date().getDate() + 1].date = '今天'
      }
      //抹掉已定日期
      let pages = getCurrentPages();
      let currPage = pages[pages.length - 1];   //当前页面
      let prevPage = pages[pages.length - 2];  //上一个页面
			if (prevPage.route =='pages/houseDetails/houseDetails'){
        req.myget('http://120.77.213.16/index/calendadate', {
          'house_id': this.data.houseid
        }, this, (res) => {
          if (res.code == 200) {
            let orderObj = {}
            res.data.forEach((item, index, arr) => {
              orderObj[index] = item.houser_data.split('-')
            })
            for (let i in orderObj) {
              if (orderObj[i][0] == this.data.currentYear && orderObj[i][1] == '0' + this.data.currentMonth) {
                for (let j in allArr) {
                  if (allArr[j].date == orderObj[i][2]) {
                    allArr[j].befor = 'befor'
                  }
                }
              }
            }
            this.setData({
              allArr
            })
          }
        })
      }
      this.setData({
        allArr
      })
      //生成判断状态数组
      let selectIndex = []
      for (let i = 0, len = this.data.allArr.length; i < len; i++) {
        selectIndex.push({
          sureid: false
        })
      }
      this.setData({
        selectIndex
      })
      let sendObj = {
        currentYear: this.data.currentYear,
        currentMonth: this.data.currentMonth,
				houseid: this.data.houseid,
        allArr: allArr
      }
      this.triggerEvent('sendObj', sendObj)
    },
    selectRep: function(e) {
      let index = e.currentTarget.dataset.selectindex; //当前点击元素的自定义数据
      let selectIndex = this.data.selectIndex; //取到data里的selectIndex
      selectIndex[index].sureid = !selectIndex[index].sureid; //点击就赋相反的值
      this.setData({
        selectIndex: selectIndex //将已改变属性的json数组更新
      })
      //遍历数组找到true
      let arr = []
      for (let i in this.data.selectIndex) {
        if (this.data.selectIndex[i].sureid == true) {
          arr.push(i)
        }
      }
      let len = arr.length
      let j = arr[0]
      for (; j < arr[len - 1]; j++) {
        selectIndex[j].sureid = true;
      }
      // console.log(selectIndex)
      this.setData({
        selectIndex: selectIndex //将已改变属性的json数组更新
      })
      let month = this.data.currentMonth.toString()
      let tomDate=''
      let day =this.data.allArr[arr[0]].date.toString()
      if (day.split('').length< 1) {
        day = '0' + day
      }
      if (month.split('')[0] != 0) {
        month = '0' + month
      }
      if (arr.length > 1) {
        let tomDay = this.data.allArr[arr[1]].date.toString()
        if (tomDay.split('').length < 1) {
          tomDay = '0' + tomDay
        }
        tomDate = this.data.currentYear + '-' + month + '-' + tomDay
      }
      let nowDate = this.data.currentYear + '-' + month+'-'+day
      // console.log(nowDate, tomDate)
      if (len > 1) {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面
        prevPage.setData({
          nowDate,
          tomDate,
          isBack:true
        })
        wx.navigateBack({
          delta:1
        })
      }
    }
  }
})