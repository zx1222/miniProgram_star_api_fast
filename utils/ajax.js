import apiUrl from 'parm.js'
import {
  sha1
} from './sha1'

const appid = 'miinno.com'
const secret = '123456'
const version = 'api/v1'
const timestamp = new Date().getTime()
const a = appid + 'APPID' + secret + 'SECRET' + timestamp
const sign = sha1(appid + 'APPID' + secret + 'SECRET' + timestamp)
const token = sign + '.' + timestamp + '.' + version

const ajaxData = (url, type = 'GET') => {
  var defaultHeader = {
  
  }
  return ((params = {}, method = 'GET') => {
    return new Promise((resolve, reject) => {
      // const userSession = wx.getStorageSync('userSession');
      const userData = {
        // appId: apiUrl.appId,
        // userSession: userSession,
      }

      const newdata = Object.assign({}, userData, params);

      wx.request({
        url: url,
        data: newdata,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'X-Token-With': token,
          // 'Authorization': `Miinno ${wx.getStorageSync('access_token')}`
        },
        method: method === 'GET' ? 'GET' : method,
        success(res) {
          if (res.data.code === 0 && res.statusCode === 200) {
            resolve(res.data)
          } else {
            resolve(res.data)
          }

          if (res.data.error == 2) {
            reject(res.data)
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            });
          }
        },
        fail: function() {
          console.log(wx.getStorageSync('access_token'));
        }
      });
    });
  });
}
var method
const exportApi = {}
for (let obj in apiUrl) {
  if (apiUrl[obj].indexOf('http') !== -1) {
    exportApi[obj] = ajaxData(apiUrl[obj], 'GET')
  }
}

export default exportApi