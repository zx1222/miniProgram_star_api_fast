// pages/forumView/index.js
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
  gets
} = getApp()

Page(Object.assign({}, common, gets, {

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

    item: {},
    comment_list: [],
    is_report: false,
    // 分页
    loading: false,
    noData: false,
    currentPage: 1,
    pageSize: 10,

    is_report: false,
    placeholder: '我也来说一句...',
    bubbles: false,
    reportReasonArr: [{
        name: '1',
        value: '广告'
      },
      {
        name: '2',
        value: '人身攻击'
      },
      {
        name: '3',
        value: '违法违规'
      },
      {
        name: '4',
        value: '其他'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.genderTheme)
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      id: options.id
    })
    if (options.from)
      this.setData({
        from: options.from,
        gender: app.globalData.gender,
        genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
        idol_index: app.globalData.idol_index,
        idolTheme: app.globalData.idolTheme,
        id: options.id
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
        backgroundColor: this.data.genderTheme.main,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    }
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var param = {
      id: this.data.id
    }

    gets.forumdetail(param).then(res => {
      this.setData({
        detail: res
      })
    })

    var params = {
      id: this.data.id,
      page: 1
    }

    gets.comment(params).then(result => {
      this.setData({
        comment: result.items,
        current_page: result._meta.currentPage,
        count_page: result._meta.pageCount,
      })
      if (parseInt(this.data.current_page) + 1 > this.data.count_page) {
        this.setData({
          isLoading: true,
        })
      }
    })
  },

  clear: function() {
    var param = {
      id: this.data.id,
      status: 2,
      type: 1,
    }
    ajax.favorite(param).then(res => {
      this.onShow()
    })
  },
  // 收藏成功
  like: function() {
    var param = {
      id: this.data.id,
      status: 1,
      type: 1,
    }
    ajax.favorite(param).then(res => {
      this.onShow()
    })
  },

  // 点赞
  praise: function(e) {
    console.log(e.currentTarget.dataset.status)
    var status = e.currentTarget.dataset.status
    var type = e.currentTarget.dataset.type
    var param = {
      type: type,
      id: this.data.id,
      status: status
    }

    ajax.praise(param).then(res => {
      console.log(res)
      this.onShow()
    })
  },
  blurChange: function(e) {
    this.setData({
      text: e.detail.value
    })
  },
  // 发布评论
  submit: function(e) {
    console.log("发布评论")
    var param = {
      content: this.data.text,
      id: e.currentTarget.dataset.id,
      type: e.currentTarget.dataset.type,
    }
    var that = this
    ajax.writeComment(param).then(res => {
      that.setData({
        value: ''
      })
      console.log(this.data.placeholder)
      that.onShow()
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
    console.log(data)
    wx.navigateTo({
      url: `/pages/replyComment/index?id=${data.id}&&uid=${
        data.uid}&&type=${data.type}&&uname=${data.uname}`,
    })
  },
  // 评论列表
  turnToView: function (e) {
    var commenid = e.currentTarget.dataset.commenid
    wx.navigateTo({
      url: `/pages/commentView/index?commenid=${commenid}`,
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
    if (res.from === 'button') {}
    return {
      title: 'star',
      path: `/pages/forumView/index?id=${this.data.id}`,
      imageUrl: ''
    }
  }
}))