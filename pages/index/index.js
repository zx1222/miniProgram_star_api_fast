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


const {
  gets,
  ajax,
  util,
  common
} = getApp()

Page(Object.assign({}, common, gets, {
  data: {
    genderTheme: {},
    gender: 2,
    // 区别首页及歌姬详情页list标识 1 首页 2详情
    p_swiper: 1,
    mediaType: ['直播', '动画', 'PV', 'MV', '短视频', '事件'],
    indicatorArr: ['推荐', '直播', '动画', 'PV', 'MV', '短视频', '事件'],
    resultData: {},
    tab_id: 0,
    tab_top_id: 0,
    tab_bottom_id: 0,

    // list 分页
    loading: false,
    noData: false,
    currentPage: 1,
    pageSize: 10,
    banner: [],
    isLoading: false,
    current_page: 1,
    count_page: 1,
    placeholder: '战斗吧歌姬',
    last: false,
    imgheights: [],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    current: 0,
    avatar: '',
    userinfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    this.getIndex(0)
    this.banner('')
    this.getGenderSkin()
    gets.userInfo().then(res => {
          app.globalData.userinfo = res
          this.setData({
            userinfo: res
          })
        })
    // if (wx.getStorageSync('isReady')) {
    //   // this.initActivity();
    //   app.readyCallback = () => {
    //     gets.userInfo().then(res => {
    //       app.globalData.userinfo = res
    //       this.setData({
    //         userinfo: res
    //       })
    //     })
       
    //   };
    // } else {
    //   wx.setStorageSync('isReady', true)
    //   app.readyCallback = () => {
    //     gets.userInfo().then(res => {
    //       app.globalData.userinfo = res
    //       this.setData({
    //         userinfo: res
    //       })
    //     })
    //     this.getIndex(0)
    //     this.banner('')
    //     this.getGenderSkin()
    //   };
    // }
 
  },

  onShow: function() {
    if (wx.getStorageSync('gender') != '' && wx.getStorageSync('gender') != undefined) {
      const gender = wx.getStorageSync('gender')
      app.globalData.gender = gender
      app.globalData.is_gender_selected = 1
    }

    // this.getData();
    this.setData({
      searchQuery: '',
      placeholder: '战斗吧歌姬',
    })


    this.setData({
      page: 1,
      last: false
    })



    // 查询用户是否授权
    // wx.getSetting({
    //   success: (res) => {
    //     if (res.authSetting['scope.userInfo']) {
    //       this.setData({
    //         is_open: false
    //       })
    //     } else {
    //       this.setData({
    //         is_open: true
    //       })
    //     }
    //   }
    // })
    // // 查询手机型号
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
      if (res.pixelRatio == 2.75) {
        app.globalData.iphone_type = 'android275'
      }
      if (res.pixelRatio == 3 && res.screenWidth == 360 && res.screenHeight == 640) {
        app.globalData.iphone_type = 'android3'
      }

      this.setData({
        systemInfo: res,
        iphone_type: app.globalData.iphone_type
      })
    })
  },
  imageLoad: function(e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比
      ratio = imgwidth / imgheight;
    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
    console.log(this.data.imgheights)
  },
  bindchange: function(e) {
    this.setData({
      current: e.detail.current
    })
  },
  // 请求首页内容**********
  getIndex: function(type) {
    var params = {
      type: type,
      page: 1,
      limits: 10
    }

    gets.getIndex(params).then(res => {
      console.log(res)
      this.setData({
        list: res.items,
        current_page: res._meta.currentPage,
        count_page: res._meta.pageCount,
        type: type
      })

      if (parseInt(res._meta.currentPage) == parseInt(res._meta.pageCount)) {
        this.setData({
          isLoading: true,
        })
      } else {


        this.setData({
          isLoading: false,
        })

        console.log(this.data.isLoading)
      }

    })
  },
  // 获取genderskin
  getGenderSkin: function() {
    gets.getGenderSkin('').then(res => {
      this.setData({
        gender: res.sex_skin,
        genderTheme: app.globalData.genderTheme[res.sex_skin - 1],
      })
      app.globalData.gender = res.sex_skin

      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: this.data.genderTheme.main,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    })
  },

  // 请求轮播图
  banner: function(type) {
    var params = {
      type: type,
      page: 1
    }
    gets.banner(params).then(res => {
      console.log(res)
      this.setData({
        banner: res,
        type: type
      })
    })
  },
  // tab切换  数据变化*************
  _tapIndicator: function(e) {
    // console.log(e.currentTarget.dataset.index)
    var types = e.currentTarget.dataset.index
    this.setData({
      swiperCurrent: types,
      banner: [],
      list: [],
      tab_id: types,
      page: 1,
    })
    this.getIndex(types)
    this.banner(types)
  },
  search: function(e) {
    this.setData({
      searchQuery: e.detail
    })
    console.log(this.data.searchQuery)
  },

  // 去详情
  turnToViewVideo: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    var from = e.currentTarget.dataset.from
    console.log(this.data.swiperCurrent)
    if (this.data.swiperCurrent != 6) {
      wx.navigateTo({
        url: `/pages/videoView/index?id=${id}&from=${from}`,
      })
    } else {
      wx.navigateTo({
        url: `/pages/newsView/index?id=${id}&from=${from}`,
      })
    }
  },

  todetail: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/newsView/index?id=${id}`,
    })
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
  // formatlist1: function(list) {
  //   const data = list
  //   data.forEach((item) => {
  //     item.date = formatDate1(item.date)
  //   })
  //   return data
  // },
  // formatlist2: function(list) {
  //   const data = list
  //   data.forEach((item) => {
  //     item.date = formatDate2(item.date)
  //   })
  //   return data
  // },

  // onReachBottom: function() {
  //   let voteList = this.data.voteList;
  //   let newVoteList = []
  //   let data = {
  //     limits: this.data.pageSize,
  //     page: this.data.currentPage + 1,
  //     id: 1,
  //   }
  //   if (!this.data.noData) {
  //     this.setData({
  //       loading: true
  //     })
  //     const resData = [{
  //         poster: '../../images/video-poster-default.png',
  //         title: '卡缇娅视频',
  //         tag: '直播',
  //         date: 1537088018
  //       },
  //       {
  //         poster: '../../images/video-poster-default.png',
  //         title: '卡缇娅视频',
  //         tag: '直播',
  //         date: 1537088018
  //       },
  //     ]

  //     newList = this.formatlist1(resData)
  //     this.setData({
  //       list: this.data.list.concat(newList),
  //       loading: false
  //     })
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
  // }
  // },

  toMy: function() {
    wx.switchTab({
      url: '/pages/user/index',
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      searchQuery: e.detail.value
    })
    console.log(this.data.searchQuery)
  },
  submit: function() {
    // console.log(this.data.searchQuery)
    // if (this.data.searchQuery != '') {
    wx.navigateTo({
      url: `/pages/searchResult/index?text=${this.data.searchQuery}`
    })
    // }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.isLoading) {
      return;
    }
    this.data.isLoading = true;
    if (this.data.count_page < this.data.current_page) return;
    this.setData({
      isLoading: true
    })

    var params = {
      type: this.data.type,
      page: ++this.data.current_page,
      limits: 10

    }
    var that = this
    gets.getIndex(params).then(res => {
      console.log(res)
      that.setData({
        list: that.data.list.concat(res.items),
        current_page: res._meta.currentPage,
        count_page: res._meta.pageCount,
      })

      console.log(parseInt(that.data.current_page))
      console.log(parseInt(that.data.count_page))


      if (parseInt(res._meta.currentPage) == parseInt(res._meta.pageCount)) {
        that.setData({
          isLoading: true,
          last: true
        })
        console.log(parseInt(that.data.current_page))
      } else {
        that.setData({
          isLoading: false,
          last: false
        })
      }
      console.log(this.data.isLoading)
    })
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
  onPullDownRefresh: function() {
    // this.myRecordingA(1, answerUrl);
    wx.stopPullDownRefresh();

  }
}))