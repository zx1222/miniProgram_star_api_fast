// pages/myCollection/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate1,
  formatDate2
} from '../../utils/formatDate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ['视频', '文章'],
    tabCurrent: 0,
    gender: 2,
    genderTheme: {},
    idol_index: 2,
    idolTheme: [],
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      idolTheme: app.globalData.idolTheme,
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
  tapIndicator(e) {
    this.setData({
      tabCurrent: e.target.dataset.index
    });
    const data = this.data.tabCurrent
    if (this.data.tabCurrent == 0) {
      this.setData({
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
      })
    }
    if (this.data.tabCurrent == 1) {
      console.log('aa')
      const data = [{
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        comment_count: 77,
        date: 1537088018
      }, {
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        comment_count: 77,
        date: 1537088018
      }]
      this.setData({
        list: this.formatlist2(data)
      })
    }
  },
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
      console.log(item)
    })
    return data
  },
  turnToViewVideo: function () {
    wx.navigateTo({
      url: `/pages/videoView/index?${this.data.id}`,
    })
  },
  turnToViewNews: function () {
    wx.navigateTo({
      url: `/pages/newsView/index`,
    })
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