import * as Login from './utils/login'

App({
  isReady: wx.getSystemInfoSync('isReady'),
  readyCallback: null,
  globalData: {
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
    idol_list: [{
        index: 0,
        avatar: '../../images/idol-avatar1.png',
        fans: 100,
        name: '卡缇娅·乌拉诺娃',
        short_name: '卡缇娅',
        desc: '除了祖国的命令，\n只有游戏才能让她动起来的萝莉',
        is_follow: 2,
      },
      {
        index: 1,
        avatar: '../../images/idol-avatar2.png',
        fans: 100,
        name: '罗兹·巴蕾特',
        short_name: '罗兹',
        desc: '认真努力的摇滚少女',
        is_follow: 2
      },
      {
        index: 2,
        avatar: '../../images/idol-avatar3.png',
        fans: 100,
        name: '李清歌',
        short_name: '清歌',
        desc: '神秘优雅的大家闺秀',
        is_follow: 2
      },
      {
        index: 3,
        avatar: '../../images/idol-avatar4.png',
        fans: 100,
        name: '伊莎贝拉·霍利',
        short_name: '伊莎贝拉',
        desc: '青春活泼的超级乐天派',
        is_follow: 1
      },
      {
        index: 4,
        avatar: '../../images/idol-avatar5.png',
        fans: 100,
        name: '神宫司玉藻',
        short_name: '玉藻',
        desc: '自称妖狐转世的中二少女',
        is_follow: 1
      }
    ],
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
    Login.checkSession()
      .then((res) => {

      })
      .catch(() => {
        wx.setStorageSync('isReady', false)
        wx.removeStorageSync('access_token')
        // Login.login()
        //       .then(() => {
        //             wx.setStorageSync('isReady', true)
        //             if (this.readyCallback) {
        //                   this.readyCallback();
        //             }
        //       });
      })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {}
      }
    })

    // 设置字体
    wx.loadFontFace({
      family: 'FZLTHJT',
      source: 'url("https://star.t.miinno.net/star_img/FZLTHJT.ttf")',
      success: function(res) {
        console.log(res)
        console.log(res.status) //  loaded
      },
      fail: function(res) {
        console.log(res.status) //  error
      },
      complete: function(res) {
        console.log(res.status);
      }
    });
    wx.loadFontFace({
      family: 'FZZCHJT',
      source: 'url("https://star.t.miinno.net/star_img/FZZCHJT.ttf")',
      success: function(res) {
        console.log(res)
        console.log(res.status) //  loaded
      },
      fail: function(res) {
        console.log(res.status) //  error
      },
      complete: function(res) {
        console.log(res.status);
      }
    });
    wx.loadFontFace({
      family: 'FZLTCHJT',
      source: 'url("https://star.t.miinno.net/star_img/FZLTCHJT.ttf")',
      success: function(res) {
        console.log(res)
        console.log(res.status) //  loaded
      },
      fail: function(res) {
        console.log(res.status) //  error
      },
      complete: function(res) {
        console.log(res.status);
      }
    });
  }
})