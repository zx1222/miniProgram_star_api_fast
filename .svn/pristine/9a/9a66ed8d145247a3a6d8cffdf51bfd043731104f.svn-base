// components/searchResult/index.js
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
    gender:2,
genderTheme:{},
    list: [{
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: '短视频',
        date: 1537088018
      },
      {
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: 'PV',
        date: 1537088018
      },
      {
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: 'NV',
        date: 1537088018
      },
      {
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: '直播',
        date: 1537088018
      }, {
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: 'PV',
        date: 1537088018
      },
      {
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: 'NV',
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      list: this.formatlist(this.data.list)
    })
  },
  formatlist: function (list) {
    const data = list
    data.forEach((item) => {
      item.date = formatDate1(item.date)
    })
    return data
  },
  turnToViewVideo: function () {
    wx.navigateTo({
      url: `/pages/videoView/index?${this.data.id}`,
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