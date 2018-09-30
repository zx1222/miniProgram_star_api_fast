// pages/videoVIew/index.js
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
    idol_index: 0,
    idolTheme: [],
    // 是否获得焦点
    is_focus: false,

    // 分页
    loading: false,
    noData: false,
    currentPage: 1,
    pageSize: 10,

    is_report: false,
    // 首页1 歌姬2
    from: 1,
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
    const item = this.data.item;

    console.log(options)
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

  // 发布评论
  comment: function(e) {
    console.log("发布评论")
    var param = {
      content: this.data.text,
      id: e.currentTarget.dataset.id,
      pid: e.currentTarget.dataset.pid,
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
  turnToReply: function(e) {
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
      id: this.data.id,
    }

    gets.mediaDetail(param).then(res => {
      console.log()
      this.setData({
        detail: res,
        placeholder: '我也来说一句...'
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

  // 取消收藏
  clear: function() {
    var param = {
      id: this.data.id,
      status: 2,
      type: 3,
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
      type: 3,
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
    var id = e.currentTarget.dataset.id
    var param = {
      type: type,
      id: id,
      status: status
    }

    ajax.praise(param).then(res => {
      console.log(res)
      this.onShow()
    })
  },

  // 举报弹窗
  reporte: function(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      reportId: e.currentTarget.dataset.id
    })

    if (this.data.bubbles) {
      this.setData({
        bubbles: false
      })
    } else {
      this.setData({
        bubbles: true
      })
    }
  },


  // 提交举报
  report: function() {
    var param = {
      reason: this.data.reason,
      desc: this.data.desc,
      id: this.data.reportId,
      type: 2
    }

    ajax.report(param).then(res => {
      console.log(res)
      this.onShow()
      this.setData({
        bubbles: false
      });
    })

  },

  // 取消举报
  cancel: function() {

    this.setData({
      bubbles: false
    });
  },

  // 举报内容选择

  radioChange: function(e) {
    this.setData({
      reason: e.detail.value
    })
  },

  // 举报文本
  textarea: function(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  // 评论列表
  turnToView: function(e) {
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
    console.log(this.data.isLoading)
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
      page: ++this.data.current_page

    }
    var that = this
    ajax.comment(params).then(res => {
      console.log(res)
      that.setData({
        list: that.data.comment.concat(res.items),
        current_page: res._meta.currentPage,
        count_page: res._meta.pageCount,
      })

      console.log(parseInt(that.data.current_page))
      console.log(parseInt(that.data.count_page))
      if (parseInt(that.data.current_page) >= parseInt(that.data.count_page)) {
        that.setData({
          isLoading: true,
        })
      }
      console.log(this.data.isLoading)
    })

  },
  focusChange: function(e) {
    this.setData({
      is_focus: true
    })
    console.log(this.data.is_focus)
  },
  blurChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      is_focus: false,
      text: e.detail.value
    })
  },
  bindTextChange: function(e) {
    this.setData({
      text: e.detail.value
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
    if (res.from === 'button') {
    }
    return {
      title: 'star',
      path: `/pages/videoView/index?id=${this.data.id}`,
      imageUrl: ''
    }
  }
}))