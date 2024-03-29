/**
 * @desc    API请求接口类封装
 */
/**
 * POST请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestPostApi(url, params, sourceObj, successFun, failFun, completeFun) {
  requestApi(url, params, 'POST', sourceObj, successFun, failFun, completeFun)
}
/**
 * GET请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestGetApi(url, params, sourceObj, successFun, failFun, completeFun) {
  requestApi(url, params, 'GET', sourceObj, successFun, failFun, completeFun)
}
/**
 * 请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {String}   method      请求类型
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestApi(url, params, method, sourceObj, successFun, failFun, completeFun) {
  if (method == 'POST') {
    var contentType = 'application/x-www-form-urlencoded'
  } else {
    var contentType = 'application/json'
  }
  wx.request({
    url: url,
    method: method,
    data: params,
    header: {
      'Content-Type': contentType
    },
    success: function(res) {
      if (typeof successFun == 'function') {
        if (res.statusCode == 200) {
          successFun(res.data, sourceObj)
        }else{
          wx.showLoading({
            title: '网络开小差'
          })
          console.log('错误码:'+res.statusCode)
        }
      }

    },
    fail: function(res) {
      typeof failFun == 'function' && failFun(res.data, sourceObj)
    },
    complete: function(res) {
      typeof completeFun == 'function' && completeFun(res.data, sourceObj)
    }
  })
}
module.exports = {
  'mypost': requestPostApi,
  'myget': requestGetApi
}