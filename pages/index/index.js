//index.js
//获取应用实例
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import getSystemInfo from '../../utils/getSystemInfo.js'
import {
  formatDate1,
  formatDate2
} from '../../utils/formatDate.js'


const { ajax, util, common } = getApp()

Page(Object.assign({}, common, {
  data: {
    genderTheme: {},
    gender: 2,
    // 区别首页及歌姬详情页list标识 1 首页 2详情
    p_swiper: 1,
    indicatorArr: ['推荐', '直播', '动画', 'PV', 'MV', '短视频', '事件'],
    resultData: {},
    tab_top_id: 0,
    tab_bottom_id: 0,
    list: [{
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: '直播',
        date: 1537088018
      },
      {
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: '直播',
        date: 1537088018
      },
      {
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: '直播',
        date: 1537088018
      },
      {
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: '直播',
        date: 1537088018
      }
    ],
    // list 分页
    loading: false,
    noData: false,
    currentPage: 1,
    pageSize: 10,
    banner:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    if (wx.getStorageSync('gender') != '') {
      const gender = wx.getStorageSync('gender')
      app.globalData.gender = gender
      app.globalData.is_gender_selected=1
    }

    // this.getData();
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      list: this.formatlist1(this.data.list)
    })

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.genderTheme.main,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    this.banner(0)
    console.log(this.banner(0))
  },

  onShow: function() {
    this.getIndex('')
    this.banner('')
    // 查询用户是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            is_open: false
          })
        } else {
          this.setData({
            is_open: true
          })
        }
      }
    })

    // 查询手机型号
    getSystemInfo().then((res) => {
      if (res.screenHeight == 812 && res.pixelRatio == 3) {
        app.globalData.iphone_type = 'iPhone X'
      }
      if (res.screenWidth == 375 && res.screenHeight == 667 && res.pixelRatio == 2) {
        app.globalData.iphone_type = 'iPhone 6'
      }
      if (res.screenWidth == 320 && res.screenHeight == 568 && res.pixelRatio == 2) {
        app.globalData.iphone_type = 'iPhone 5'
      }

      this.setData({
        systemInfo: res,
        iphone_type: app.globalData.iphone_type
      })
    })
  },
  // 请求首页内容**********
  getIndex:function(type){
    var params = {
      type: type,
      page: 1

    }
    ajax.getIndex(params).then(res => {
      console.log(res)
      this.setData({
        // list:res.item
      })
    })
  },

  // 请求轮播图
  banner:function(type){
    var params = {
      type: type,
      page: 1

    }
    ajax.banner(params).then(res => {
      console.log(res)
      this.setData({
        banner: res
      })
      console.log(this.data.banner)
    })
  },
  // tab切换  数据变化*************
  catchChildSwiper: function(e) {
    
    var types= e.detail
    this.getIndex(types)
    this.banner(types)

    // this.setData({
    //   tab_top_id: e.detail
    // })
    // console.log(this.data.tab_top_id)
    // if (this.data.tab_top_id == 0) {
    //   this.setData({
    //     resultData: {
    //       banners: ['../../images/banner.jpg',
    //         '../../images/banner.jpg',
    //       ]
    //     }
    //   })
    // }
    // if (this.data.tab_top_id == 1) {
    //   this.setData({
    //     resultData: {
    //       banners: ['../../images/banner.jpg',
    //         '../../images/banner.jpg',
    //       ]
    //     }
    //   })
    // }

    // if (this.data.tab_top_id == 6) {
    //   const data = [{
    //     poster: '../../images/video-poster-default.png',
    //     title: '卡缇娅视频',
    //     comment_count: 77,
    //     date: 1537088018
    //   }]
    //   this.setData({
    //     list: this.formatlist2(data)
    //   })
    //   console.log(this.data.list)
    // } else {
    //   const list = [{
    //       poster: '../../images/video-poster-default.png',
    //       title: '卡缇娅视频',
    //       tag: '直播',
    //       date: 1537088018
    //     },
    //     {
    //       poster: '../../images/video-poster-default.png',
    //       title: '卡缇娅视频',
    //       tag: '直播',
    //       date: 1537088018
    //     },
    //     {
    //       poster: '../../images/video-poster-default.png',
    //       title: '卡缇娅视频',
    //       tag: '直播',
    //       date: 1537088018
    //     },
    //     {
    //       poster: '../../images/video-poster-default.png',
    //       title: '卡缇娅视频',
    //       tag: '直播',
    //       date: 1537088018
    //     }
    //   ]
    //   this.setData({
    //     list: this.formatlist1(list)
    //   })
    // }
  },
  search: function(e) {
    this.setData({
      searchQuery: e.detail
    })
    console.log(this.data.searchQuery)
  },
  getData: function() {
    // if (this.data.tab_top_id == 0) {
    //   this.setData({
    //     resultData: {
    //       banners: ['../../images/banner.jpg',
    //         '../../images/banner.jpg',
    //         '../../images/banner.jpg',
    //       ]
    //     }
    //   })
    // }
  },

  // 获取用户信息
  // onGotUserInfo: function(e) {
  //       const url = `${app.globalData.baseUrl}/person/user-info`
  //       const data = Object.assign(e.detail, {
  //             appid: 'wxdc41a6ac2e1bcd06'
  //       })
  //       if (data.errMsg == 'getUserInfo:ok') {
  //             wx.setStorageSync('getUserInfo', true);
  //             this.setData({
  //                   is_open: !this.data.is_open
  //             })
  //             http.request(url, data, 'POST').then((res) => {
  //                   if (res.data.id) {
  //                         wx.showToast({
  //                               title: '授权成功',
  //                               icon: 'success',
  //                               duration: 1400
  //                         })
  //                   }
  //             })
  //       }
  // },
  formatlist1: function(list) {
    const data = list
    data.forEach((item) => {
      item.date = formatDate1(item.date)
    })
    return data
  },
  formatlist2: function(list) {
    const data = list
    data.forEach((item) => {
      item.date = formatDate2(item.date)
    })
    return data
  },

  onReachBottom: function() {
    let voteList = this.data.voteList;
    let newVoteList = []
    let data = {
      limits: this.data.pageSize,
      page: this.data.currentPage + 1,
      id: 1,
    }
    if (!this.data.noData) {
      this.setData({
        loading: true
      })
      const resData = [{
          poster: '../../images/video-poster-default.png',
          title: '卡缇娅视频',
          tag: '直播',
          date: 1537088018
        },
        {
          poster: '../../images/video-poster-default.png',
          title: '卡缇娅视频',
          tag: '直播',
          date: 1537088018
        },
      ]

      newList = this.formatlist1(resData)
      this.setData({
        list: this.data.list.concat(newList),
        loading: false
      })
      // http.request(url, data).then((res) => {

      //       if (newVoteList.length < this.data.pageSize) {
      //             _this.setData({
      //                   loadmore_end: true,
      //                   noData: true
      //             })
      //       }
      //       setTimeout(function () {
      //             _this.setData({
      //                   currentPage: _this.data.currentPage + 1,
      //                   voteList: voteList.concat(newVoteList),
      //                   loading_more: false
      //             })
      //       }, 300)
      // });
    }
  },

  onShareAppMessage: function(res) {
    if (res.from === 'button') {

    }
    return {
      title: 'COSRUN幻装跑',
      path: '/pages/home/index',
      imageUrl: '../../assets/images/share-cover.jpg'
    }
  },
}))