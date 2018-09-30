// pages/leaderBoard/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import getSystemInfo from '../../utils/getSystemInfo.js'

const {
  ajax,
  util,
  common,
  apiUrl,
  gets
} = getApp()
Page(Object.assign({}, common, gets, {

  /**
   * 页面的初始数据
   */
  data: {
    iphone_type: '',
    tab_id: 3,
    tab_top_id: 0,
    gender: 2,
    genderTheme: {},
    tabArr: ['歌姬人气榜', '粉丝贡献榜'],
    tabCurrent: 0,
    // 动态tab
    indicatorArr: ['实时周榜', '月榜', '年榜'],
    swiperCurrent: 0,
    idolTheme: [],
    idol_index: 0,
    idol_leader_list: [],
    idol_index: 0,
    idol_list: [],

    // 周榜期数
    dateRange: [],
    dateRange_index: 0,
    batch: 0,
    isLoading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.iphone_type)
    this.setData({
      iphone_type: app.globalData.iphone_type,
      idol_index: app.globalData.idol_index,
      idolTheme: app.globalData.idolTheme,
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1]
    })
    if (app.globalData.idol_list.length == 0) {
      this.getIdolInfoList();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getWeekDateRange();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.tabCurrent == 0) {
      if (this.data.tab_top_id == 0) {
        this.getWeekRankList(this.data.batch);
      }
      if (this.data.tab_top_id == 1) {
        this.getMonthRankList(this.data.batch);
      }
      if (this.data.tab_top_id == 2) {
        this.getYearRankList(this.data.batch);
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  bindPickerChange: function(e) {
    this.setData({ //给变量赋值
      dateRange_index: e.detail.value,
      batch: this.data.dateRange[e.detail.value].batch
    })
    if (this.data.tabCurrent == 0) {
      if (this.data.tab_top_id == 0) {
        this.getWeekRankList(this.data.batch);
      }
      if (this.data.tab_top_id == 1) {
        this.getMonthRankList(this.data.batch);
      }
      if (this.data.tab_top_id == 2) {
        this.getYearRankList(this.data.batch);
      }
    }
  },
  // 获取idolList
  getIdolInfoList: function () {
    gets.getIdolList('').then(res => {
      this.setData({
        idol_list: res
      })
      app.globalData.idol_list = this.data.idol_list
    })
  },

  // 获取周榜期数
  getWeekDateRange: function() {
    gets.getWeekDateRange('').then(res => {
      this.setData({
        dateRange: res,
        batch: res[0].batch
      })
      this.getWeekRankList(this.data.batch);
    })
  },
    // 获取月榜期数
  getMonthDateRange: function() {
    gets.getMonthDateRange('').then(res => {
      this.setData({
        dateRange: res,
        batch: res[0].batch
      })
      this.getMonthRankList(this.data.batch);
    })
  },
    // 获取年榜期数
  getYearDateRange: function() {
    gets.getYearDateRange('').then(res => {
      this.setData({
        dateRange: res,
        batch: res[0].batch
      })
      this.getYearRankList(this.data.batch);
    })
  },
    // 获取周榜
  getWeekRankList: function(batch) {
    const params = {
      batch: batch
    }
    gets.getWeekRankList(params).then(res => {
      this.setData({
        isLoading:false
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: res[0].idol.dark_skin,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
      this.setData({
        idol_leader_list: res,
        idol_index: parseInt(res[0].idol_id) - 1
      })
      console.log(this.data.idol_index)
    })
  },
     // 获取月榜
  getMonthRankList: function(batch) {
    const params = {
      batch: batch
    }
    gets.getMonthRankList(params).then(res => {
      this.setData({
        isLoading: false
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: res[0].idol.dark_skin,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
      this.setData({
        idol_leader_list: res,
        idol_index: parseInt(res[0].idol_id) - 1
      })
      console.log(this.data.idol_leader_list)
    })
  },
     // 获取年榜
  getYearRankList: function(batch) {
    const params = {
      batch: batch
    }
    gets.getYearRankList(params).then(res => {
      this.setData({
        isLoading: false
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: res[0].idol.dark_skin,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
      this.setData({
        idol_leader_list: res,
        idol_index: parseInt(res[0].idol_id) - 1
      })
      console.log(this.data.idol_index)
    })
  },
  tapIndicator(e) {
    this.setData({
      'tabCurrent': e.target.dataset.index
    });
    const data = this.data.tabCurrent
    this.triggerEvent('childEvent', data, {
      bubbles: false
    });
    if (this.data.tabCurrent == 0) {
      if (this.data.tab_top_id == 0) {
        this.getWeekRankList(this.data.batch);
      }
      if (this.data.tab_top_id == 1) {
        this.getMonthRankList(this.data.batch);
      }
      if (this.data.tab_top_id == 2) {
        this.getYearRankList(this.data.batch);
      }
    }
    if (this.data.tabCurrent == 1) {
      this.getIdolInfoList();
    }
  },
  catchChildSwiper: function(e) {
    this.setData({
      tab_top_id: e.detail
    })
    if (this.data.tab_top_id == 0) {
      this.getWeekDateRange();
    }
    if (this.data.tab_top_id == 1) {
      this.getMonthDateRange();
    }
    if (this.data.tab_top_id == 2) {
      this.getYearDateRange();
    }
  },
  turnToSupport: function(e) {
    app.globalData.idol_index = parseInt(e.currentTarget.dataset.id) - 1
    console.log(parseInt(e.currentTarget.dataset.id) - 1)
    this.setData({
      idol_index: app.globalData.idol_index
    })
    wx.navigateTo({
      url: '/pages/task/index',
    })
  },
  turnToFansLeaderBoard: function(e) {
    console.log(e)
    const index =parseInt(e.currentTarget.dataset.id)-1
    console.log(e.currentTarget.dataset.id)
    app.globalData.idol_index = index
    console.log(app.globalData.idol_index)
    wx.navigateTo({
      url: `/pages/fansLeaderBoard/index`,
    })
  },
  turnToIdolView:function(e){
    console.log(e)
    const index = parseInt(e.currentTarget.dataset.id) - 1
    console.log(e.currentTarget.dataset.id)
    app.globalData.idol_index = index
    console.log(app.globalData.idol_index)
    wx.navigateTo({
      url: `/pages/idolView/index`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))