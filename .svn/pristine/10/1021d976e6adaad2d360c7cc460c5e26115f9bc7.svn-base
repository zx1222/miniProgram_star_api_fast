// pages/newsView/index.js
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
    // 是否获得焦点
    is_focus: false,
    // 分页
    loading: true,
    noData: false,
    currentPage: 1,
    pageSize: 10,

    banners: ['../../images/banner.jpg'],
    imgheights: [],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    //图片宽度 
    imgwidth: 750,
    item: {
      poster: '../../images/video-poster-default.png',
      title: '卡缇娅视频',
      date: 1537088018,
      comment_count: 100,
      like_count: 12,
      content: '这里是文字内容简介这里是文字内容简介这里是文字内容简介这里是文字内容简介这里是文字内容简介这里是文字内容简介这里是文字内容简介这里是文字内容简介这里是文字内容简介这里是文字内容简介这里是文字内容简介这里是文字内容简介这里是文字内容简介这里是文字内容简介这'
    },
    comment_list: [{
        id: 1,
        user_avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537173935576&di=1a4d9cfa47850ba062b0e622f9bd5d75&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F13%2F20160713114847_KcAJz.jpeg',
        user_name: '小丸子',
        comment_content: '真的好燃好赞啊!!多谢up主  感动哇!!!',
        like_count: 100,
        comment_count: 20,
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
    is_report: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let item = this.data.item;
    item.date = formatDate2(item.date)
    let comment_list = this.data.comment_list;

    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      comment_list: this.formatCommentData(this.data.comment_list)
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
  formatCommentData: function(data) {
    let list = data;
    list.forEach((item) => {
      item.create_time = formatDate3(item.create_time)
      // item.child_comment_list.forEach((item)=>{
      //       item.create_time = formatDate3(item.create_time)
      // })
    })
    return list
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
  },
  bindchange: function(e) {
    this.setData({
      current: e.detail.current
    })
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