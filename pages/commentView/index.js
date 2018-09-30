// pages/commentView/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate2,
  formatDate3
} from '../../utils/formatDate.js'
const {
  ajax,
  util,
  common,
  apiUrl,
  gets
} = getApp()

Page(Object.assign({}, common, apiUrl, gets, {

  /**
   * 页面的初始数据
   */
  data: {
    gender: 2,
    genderTheme: {},
    // 分页
    loading: true,
    noData: false,
    currentPage: 1,
    pageSize: 10,
    item: {},
    comment_list: [],
    is_report: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      comment_list: this.formatCommentData(this.data.comment_list),
      commenid: options.commenid
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var param = {
      comment_id: this.data.commenid
    }
    gets.replyCommentList(param).then(res => {
      this.setData({
        firstReply: res.items,
        childReply: res.items
      })
    })
  },
  // 跳转回复评论
  turnToReply: function (e) {
    const data = {
      id: e.currentTarget.dataset.id,
      uid: e.currentTarget.dataset.uid,
      type: e.currentTarget.dataset.type,
      uname: e.currentTarget.dataset.uname
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
}))