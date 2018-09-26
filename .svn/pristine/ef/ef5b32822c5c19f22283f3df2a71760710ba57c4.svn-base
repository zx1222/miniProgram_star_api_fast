const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: 2,
    genderTheme: {},
    idol_index: 2,
    idolTheme: [],
    list: [{
        index: 0,
        avatar: '../../images/idol-avatar1.png',
        fans: 100,
        name: '卡缇娅',
        hot_num: 100,
        fans_count: 100
      },
      {
        index: 1,
        avatar: '../../images/idol-avatar2.png',
        fans: 100,
        name: '罗兹',
        hot_num: 100,
        fans_count: 100
      },
      {
        index: 2,
        avatar: '../../images/idol-avatar3.png',
        fans: 100,
        name: '清歌',
        hot_num: 100,
        fans_count: 100
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      idolTheme: app.globalData.idolTheme
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.genderTheme.main,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  turnToSupport: function(e) {
    app.globalData.idol_index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/task/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})