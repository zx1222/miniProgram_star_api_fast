import apiUrl from 'parm.js'

const ajaxData = (url, type = 'GET') => {
  var defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return ((params = {}, header = defaultHeader, method = 'GET') => {
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
        header: header,
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
