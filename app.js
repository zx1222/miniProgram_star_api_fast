import * as Login from './utils/login'
import apiUrl from './utils/parm.js'
import ajax from './utils/api.js'
import gets from './utils/ajax.js'

App({
  apiUrl,
  ajax,
  gets,
  isReady: wx.getSystemInfoSync('isReady'),
  readyCallback: null,
  globalData: {
    userinfo:{},
    iphone_type:'',
    is_gender_selected: 2,
    // 1 男 2 女
    gender: 2,
    genderTheme: [{
        main: '#8d9acd',
        sub: '#c5d7ee'
      },
      {
        main: '#e95471',
        sub: '#f4a9b8'
      },
    ],

    // 歌姬颜色列表
    // 1 卡缇娅 2 罗兹 3 清歌 4 伊莎贝拉 5 玉藻
    idol_index: 0,
    idolTheme: [{
        main: '#9b86bd',
        sub: '#f0d3e4'
      },
      {
        main: '#ef878c',
        sub: '#f8caab'
      },
      {
        main: '#8d9acd',
        sub: '#c5d7ee'
      },
      {
        main: '#f5ad75',
        sub: '#fad6a8'
      },
      {
        main: '#e169a4',
        sub: '#f7c4ce'
      }
    ],
    idol_list: [],
  },
  onLaunch: function() {
    let info = wx.getSystemInfoSync();
    if (info.SDKVersion < '1.6.3') {
      wx.showModal({
        title: '提示',
        content: '您的基础库版本过低，无法正常使用本小程序。请升级您的微信。',
        success: function(res) {
          if (res.confirm) {
          } else if (res.cancel) {}
        }
      })
    }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var sysinfo = wx.getSystemInfoSync();
    if (sysinfo) {
      this.globalData.sysinfo = sysinfo;
      var width = sysinfo.windowWidth;
      this.globalData.px2rpx = 750 / width;
      this.globalData.rpx2px = width / 750;
    }
    // Login.checkSession()
    //   .then((res) => {

    //   })
    //   .catch(() => {
    //     wx.setStorageSync('isReady', false)
        // wx.removeStorageSync('access_token')
        // Login.login()
        //       .then(() => {
        //             wx.setStorageSync('isReady', true)
        //             if (this.readyCallback) {
        //                   this.readyCallback();
        //             }
        //       });
      // })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {}
      }
    })
  }
})