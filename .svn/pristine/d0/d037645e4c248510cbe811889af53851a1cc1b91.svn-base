// pages/videoVIew/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate2,
  formatDate3
} from '../../utils/formatDate.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: 2,
    genderTheme: {},
    idol_index: 0,
    idolTheme: [],
    // 是否获得焦点
    is_focus: false,

    // 是否获得焦点
    is_focus: false,
    // 分页
    loading: false,
    noData: false,
    currentPage: 1,
    pageSize: 10,
    item: {
      poster: '../../images/video-poster-default.png',
      title: '卡缇娅视频',
      date: 1537088018,
      comment_count: 100,
      like_count: 12,
    },
    comment_list: [{
        id: 1,
        user_avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537173935576&di=1a4d9cfa47850ba062b0e622f9bd5d75&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F13%2F20160713114847_KcAJz.jpeg',
        user_name: '小丸子',
        comment_content: '真的好燃好赞啊!!多谢up主  感动哇!!!',
        comment_count: 100,
        like_count: 12,
        create_time: 1537088018,
        has_child: 1,
        sub_name: 'sss',
        child_count: 10,

      },
      {
        id: 1,
        user_avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537173935576&di=1a4d9cfa47850ba062b0e622f9bd5d75&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F13%2F20160713114847_KcAJz.jpeg',
        user_name: '小丸子',
        comment_content: '真的好燃好赞啊!!多谢up主  感动哇!!!',
        like_count: 100,
        comment_count: 20,
        create_time: 1537088018,
      },
      {
        id: 1,
        user_avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537173935576&di=1a4d9cfa47850ba062b0e622f9bd5d75&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F13%2F20160713114847_KcAJz.jpeg',
        user_name: '小丸子',
        comment_content: '真的好燃好赞啊!!多谢up主  感动哇!!!',
        like_count: 100,
        comment_count: 20,
        create_time: 1537088018,
      }
    ],
    is_report: false,
    // 首页1 歌姬2
    from: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const item = this.data.item;

    console.log(options)
    if (options)
      item.date = formatDate2(item.date)
    this.setData({
      from: options.from,
      item: item,
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      idol_index: app.globalData.idol_index,
      idolTheme: app.globalData.idolTheme,
    })
    if (this.data.from == 1) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: this.data.genderTheme.main,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: this.data.idolTheme[this.data.idol_index].main,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    }

  },
  catchReport: function(e) {
    this.setData({
      is_report: e.detail
    })
    console.log(e.detail)
  },
  catchReportCancel: function(e) {
    this.setData({
      is_report: e.detail
    })
    console.log(e.detail)
  },
  catchReportSubmit: function(e) {
    this.setData({
      is_report: e.detail
    })
    console.log(e.detail)
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
  focusChange: function() {
    this.setData({
      is_focus: true
    })
  },
  blurChange: function() {
    this.setData({
      is_focus: false
    })
  },
  // 获取播放进度
  catchTimeUpdate: function(e) {
    console.log(e)
  },
  // 获取播放状态改变
  catchStatusChange: function(e) {
    console.log(e)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})