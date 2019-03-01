//app.js

App({
  onLaunch: function() {
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType == 'none'){
          wx.showToast({
            title: '无网络',
            icon: 'loading',
            duration: 60000
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJvaExQdTBOdFNtbWV6UjFvVFdBdE00ZHE1SS00IiwiZXhwIjoxNTQ4OTkwMTAzNzc3LCJhdWQiOiJ1c2VyIn0.mH9Gs1PY8tGAnXnlTorMnDhj8TnrEpmw3yxN-snoE60',
    orderinfo: [],
    loginCode: 0,
    showMethod: 'none',
    personalList: '',
    confirmPay:0,
  },

})