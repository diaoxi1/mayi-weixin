// pages/houseDetails/houseDetails.js
const req = require('../../utils/request.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgsArr:[],
		ellipsis: true,  //房源介绍收起
		height:true,  //预定须知收起
		expand:'展开全部',
		// 基本信息
		houseName: '',  
		Houser_Type: '',
		House_square: '',
		Houser_Bed: '',
		House_Price: '',
		//房源介绍
		describe:'',   
		landlordImg:'',
		landlordName:'',
		house_comment_Score:'',  //房客评价分数
		imgArr: [],	  // 房屋图片
			// 评价
		userEva:[],
		color: '',
			// 地图
		latitude: 30.5447063215,
		longitude: 104.0621154708,
		markers: [{
			id: 1,
			latitude: 30.5447063215,
			longitude: 104.0621154708,
			name: '天府软件园G区'
		}],
		// 附近同类房源
		nearly:[],
		houseRecommend:[],    //房东其他房源
		width:'',
		widNearly:'',
		index: 0,//当前的索引,
		houseid:'',
		isBack:false,
		nowDate: '12月1日',
		tomDate: '12月2日',
		night: '1',
		nowDateTime: '',
		tomDateTime: ''
	},

	// 第一个轮播图序号
	onSlideChange(e){
		let current = e.detail.current;
		let source = e.detail.source;
		//console.log(source);
		console.log(current, this.data.index)
		this.setData({
			index: current
		})
	},
// 点击查看大图
	bigImg(e){
		var this_ = this
		for (var i = 0; i < this.data.imgArr.length; i++) {
			var str = 'http://120.77.213.16' + this.data.imgArr[i].img_url;
			this_.data.imgsArr.push(str);
		}
		wx.previewImage({
			current: this_.data.imgsArr[this.data.index], // 当前显示图片的http链接
			urls: this_.data.imgsArr  // 需要预览的图片http链接列表
		})
	},

	// 房源介绍
	introduce(){
		var value = !this.data.ellipsis;
		this.setData({
			ellipsis: value,
		})
	},
	// 地图
	myMap(){
		// this.mapCtx.moveToLocation();

		// this.setData({
		// 	latitude: 30.5447063215,
		// 	longitude: 104.0621154708,
		// })
	},

	goDate(){
		wx.navigateTo({
			url: '../calendar/calendar?houseid='+this.data.houseid,
		})
	},

	// 展开全部
	expand(){
		var value = !this.data.height;
		this.setData({
			height: value,
		})
		if(value == true){
			this.setData({
				expand: '展开全部',
			})
		}else{
			this.setData({
				expand: '收起全部',
			})
		}
	},
	// 移动房客评价时变化
	transition(e) {
		this.setData({
			color: 'transparent'
		})
	},
	animationfinish(){
		this.setData({
			color: '#FF9300'
		})
	},
	// 点击附近同类房源
	nearlyTo(e){
		console.log(e)
		let item = e.currentTarget.dataset.item
		let House_id = item.Houser_id
		let Houser_Type = item.Houser_Type
		let House_pf = item.House_pf
		let Houser_name = item.Houser_name
		let Houser_Bed = item.Houser_Bed
		let House_square = item.House_square
		let Houser_Bed_size = item.Houser_Bed_size
		wx.navigateTo({
			url: '../houseDetails/houseDetails?&House_id=' + House_id + '&Houser_Type=' + Houser_Type  + '&House_pf=' + House_pf + '&Houser_name=' + Houser_name + '&Houser_Bed=' + Houser_Bed + '&House_square=' + House_square + '&Houser_Bed_size=' + Houser_Bed_size
		})
	},

// 跳转预定界面
	reservation(e){
		console.log(e)
    console.log(this.data.tomDateTime)
    console.log(this.data.Houser_Type)
		wx.navigateTo({
			url: '../confirm/confirm?House_id=' + this.data.houseid + '&nowDateTime=' + this.data.nowDateTime + '&tomDateTime=' + this.data.tomDateTime + '&Houser_Type=' + this.data.Houser_Type + '&Houser_Bed=' + this.data.Houser_Bed + '&price=' + this.data.House_Price
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// console.log(options)
		var houseId = options.House_id;
		let that = this;
		req.myget('http://120.77.213.16/index/info?House_id='+houseId, {}, this, (res) => 	{
			if (res.code == 200) {
				wx.hideLoading();
				console.log(res);
				that.setData({
					houseid: houseId,
					describe: res.housedescribe.describe_Text,
					imgArr: res.houseImg,
					houseName: options.Houser_name,
					Houser_Type: options.Houser_Type,
					House_square: options.House_square,
					Houser_Bed: options.Houser_Bed,
					Houser_Bed_size: options.Houser_Bed_size,
					House_Price: options.House_Price,
					houseRecommend: res.houseRecommend,
					userEva: res.houseComment,
					landlordImg: res.housedescribe.avatarUrl,
					landlordName: res.housedescribe.nickName,
					nearly: res.cityAndpfAndmoney,
					widNearly: (res.cityAndpfAndmoney.length) * 85 - 5,
					width: (res.houseRecommend.length) * 85 -5
				})
				
			}
		})
		
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function (e) {
		this.mapCtx = wx.createMapContext('myMap')
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		let pages = getCurrentPages();
		let currPage = pages[pages.length - 1]; //当前页面
		console.log(currPage.data.isBack)
		if (currPage.data.isBack) {
			let nowDay = currPage.data.nowDate.split('-')[2]
			let tomDay = currPage.data.tomDate.split('-')[2]
			let month = currPage.data.nowDate.split('-')[1]
			if (month.split("")[0] == 0) {
				month = month.split("")[1]
			}
			console.log(month + '月' + nowDay + '日', month + '月' + tomDay + '日')
			this.setData({
				nowDate: month + '月' + nowDay + '日',
				tomDate: month + '月' + tomDay + '日',
				night: tomDay - nowDay,
				nowDateTime: currPage.data.nowDate,
				tomDateTime: currPage.data.tomDate
			})
		}
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		let pages = getCurrentPages();
		let currPage = pages[pages.length - 1]; //当前页面
		currPage.setData({
			isBack: false
		})
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