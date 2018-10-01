// pages/newsView/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate2,
  formatDate3
} from '../../utils/formatDate.js'
const { ajax, util, common, apiUrl,gets } = getApp()

Page(Object.assign({}, common, apiUrl, gets,{


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
    
    text:'',
    is_report: false,
    bubbles:false,
    reportId:'',
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
    reason: 0,
    desc: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    var that = this
    wx.request({
      url: apiUrl.mediaDetail, //仅为示例，并非真实的接口地址
      data: {
        id: this.data.id,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          detail: res.data
        })
        console.log(res)
      }
    })

    var param = {
      id: this.data.id,
    }

    gets.mediaDetail(param).then(res => {
      console.log(res)
      this.setData({
        detail: res
      })
    })

    gets.comment(param).then(result => {
      console.log(result)
      this.setData({
        comment: result.items,
        current_page: result._meta.currentPage,
        count_page: result._meta.pageCount,
      })

      if (parseInt(this.data.current_page) > parseInt(this.data.count_page)) {
        this.setData({
          isLoading: true,
        })
      }
    })
  },
  bindTextChange: function (e) {
    this.setData({
      text: e.detail.value
    })
  },
  // 发布评论
  comment: function (e) {
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
        text: ''
      })
      console.log(this.data.placeholder)
      that.onShow()
    })
  },

  // 取消收藏
  clear: function () {
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
  like: function () {
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
  praise: function (e) {
    console.log(e.currentTarget.dataset.status)
    var status = e.currentTarget.dataset.status
    var type = e.currentTarget.dataset.type
    const id = e.currentTarget.dataset.id
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

  // 举报内容选择

  radioChange: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },

  // 举报文本
  textarea: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },
  
  // 举报弹窗
  reporte: function (e) {
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
  report: function () {
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
  // 评论列表
  turnToView: function (e) {
    var commenid = e.currentTarget.dataset.commenid
    wx.navigateTo({
      url: `/pages/commentView/index?commenid=${commenid}`,
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
  onReachBottom: function () {
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
      page: ++this.data.current_page,
      id:this.data.id

    }
    var that = this
    gets.comment(params).then(res => {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if (res.from === 'button') {
    }
    return {
      title: 'star',
      path: `/pages/newsView/index?id=${this.data.id}`,
      imageUrl: ''
    }
  }
}))