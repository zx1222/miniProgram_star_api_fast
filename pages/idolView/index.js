// pages/idolView/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate1,
  formatDate2
} from '../../utils/formatDate.js'
const {
  gets,
  ajax,
  util,
  common
} = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ['自我介绍', '动态', '后援会'],
    tabCurrent: 0,
    // 动态tab
    indicatorArr: ['直播', '动画', 'PV', 'MV', '短视频', '事件'],

    swiperCurrent: 0,
    // 判断是首页还是歌姬详情
    p_swiper: 1,

    // 关注成功popup显示
    is_show: false,
    // 取关弹窗
    is_followcancel_show: false,
    idolTheme: [],
    idol_index: 0,
    idol_info: {},

    // 动态变量
    resultData: {},
    loading: false,
    tab_top_id: 0,
    list: [],

    // 后援会
    // 规则 显示与否
    is_rules_show: false,
    forum_list: [],
    // 发布类型与否
    is_post_show: false,

    // 后援会帖子
    forum_page: 1,
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
    poster_info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      idol_index: app.globalData.idol_index,
      idolTheme: app.globalData.idolTheme,
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
    })
    if(options.tab){
      this.setData({
        tabCurrent: options.tab
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getIdolInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getIndex(1)
    this.banner(1)
    this.getForumList()
  },
  _tapIndicator: function(e) {
    console.log(e)
    var types = e.currentTarget.dataset.index
    this.setData({
      swiperCurrent: types,
      banner: [],
      list: [],
      tab_id: parseInt(types) + 1,
      page: 1
    })
    // this.getIndex(types)
    // this.banner(types)

  },
  // 请求首页内容**********
  getIndex: function(type) {
    var params = {
      type: type,
      page: 1
    }
    ajax.getIndex(params).then(res => {
      console.log(res)
      this.setData({
        list: res.items,
        current_page: res._meta.currentPage,
        count_page: res._meta.pageCount,
        type: type
      })
      if (parseInt(this.data.current_page) + 1 > this.data.count_page) {
        this.setData({
          isLoading: true,
        })
      }
    })
  },
  // 获取歌姬信息
  getIdolInfo: function() {
    console.log(this.data.idol_index)
    const params = {
      idol_id: this.data.idol_index + 1
    }
    gets.getIdolInfo(params).then(res => {
      this.setData({
        idol_info: res
      })
      wx.setNavigationBarTitle({
        title: res.fullname
      })
      const index = parseInt(res.id) - 1
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: this.data.idolTheme[index].main,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    })
  },

  // 请求轮播图
  banner: function(type) {
    var params = {
      type: type,
      page: 1
    }
    ajax.banner(params).then(res => {
      console.log(res)
      this.setData({
        banner: res,
        type: type
      })
    })
  },

  // tab切换  数据变化*************
  _tapIndicator: function(e) {
    console.log(e.currentTarget.dataset.index)
    var types = e.currentTarget.dataset.index
    console.log(this.data.swiperCurrent)
    this.setData({
      swiperCurrent: types,
      banner: [],
      list: [],
      tab_id: types,
      page: 1
    })
    this.getIndex(parseInt(types) + 1)
    this.banner(parseInt(types) + 1)
  },

  // 去视频详情
  turnToViewVideo: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    var from = e.currentTarget.dataset.from
    wx.navigateTo({
      url: `/pages/videoView/index?id=${id}&from=${from}`,
    })
  },

  todetail: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    var from = e.currentTarget.dataset.from
    wx.navigateTo({
      url: `/pages/newsView/index?id=${id}&&from=${from}`,
    })
  },

  getForumList: function() {
    const params = {
      page: this.data.forum_page,
      idol_id: this.data.idol_index + 1
    }
    gets.getIdolForums(params).then(res => {
      this.setData({
        forum_list: res.items
      })
    })
  },
  // 去帖子详情
  turnToViewForum: function(e) {
    const id=e.currentTarget.dataset.id
    var from = e.currentTarget.dataset.from
    wx.navigateTo({
      url: `/pages/forumView/index?id=${id}&&from=${from}`,
    })
  },
  // 点赞帖子
  praise: function(e) {
    console.log(e.currentTarget.dataset.status)
    var status = e.currentTarget.dataset.status
    const  index= e.currentTarget.dataset.index
    const id = e.currentTarget.dataset.id
    var param = {
      type: 1,
      id: id,
      status: status
    }
    ajax.praise(param).then(res => {
      this.getForumList();
    })
  },

  radioChange: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },
    // 举报文本
  textarea:function(e){
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
  cancel:function(){
    this.setData({
      bubbles: false
    })
  },
  // 提交举报
  report: function () {
    var param = {
      reason: this.data.reason,
      desc: this.data.desc,
      id: this.data.reportId,
      type: 1
    }
    ajax.report(param).then(res => {
      console.log(res)
      this.getForumList();
      this.setData({
        bubbles: false
      });
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
  //       onPullDownRefresh: function() {
  //             console.log(this.data.tabCurrent)
  // if(this.data.tabCurrent!=1){
  //       wx.stopPullDownRefresh()
  // }
  //       },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  tapIndicator(e) {
    this.setData({
      'tabCurrent': e.target.dataset.index
    });
    if (this.data.tabCurrent == 0 || this.data.tabCurrent == 2) {
      this.getIdolInfo();
      console.log(this.data.idol_info)
    }
  },


  // 关注
  follow: function(e) {
    const params = {
      idol_id: this.data.idol_info.id,
    }
    const idol_info = this.data.idol_info
    gets.follow(params).then(res => {
      idol_info.is_attention = 1
      this.setData({
        is_show: true,
        idol_info: idol_info,
        poster_info:res
      })
      wx.getSetting({
        success: (res) => {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (res) => {
              this.downloadFile()
            },
            fail: function () {
              wx.openSetting({
                success: (res) => {
                  if (!res.authSetting["scope.writePhotosAlbum"] || !res.authSetting["scope.writePhotosAlbum"]) { }
                }
              })
            }
          })
        }
      })　　
    })
  },
  downloadFile: function () {
    var imgUrl = this.data.poster_info.poster;
    //图片地址
    wx.downloadFile({
      url: imgUrl,
      success: function (res) {
        // 下载成功后再保存到本地
        wx.saveImageToPhotosAlbum({
          //返回的临时文件路径，下载后的文件会存储到一个临时文件
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '成功保存图片',
            })
          }
        })
      }
    })
  },

  // 取关
  followCancel: function(e) {
    this.setData({
      // idol_index: parseInt(e.currentTarget.dataset.id) - 1,
      is_followcancel_show: true
    })
  },
  closePopup: function() {
    this.setData({
      is_show: false,
      is_rules_show: false,
      is_post_show: false
    })
  },
  turnToSupport: function() {
    wx.navigateTo({
      url: '/pages/task/index',
    })
  },
  // 取消取关
  catchCancel: function(e) {
    this.setData({
      is_followcancel_show: false
    })
  },
  // 确定取关
  catchConfirm: function(e) {
    const params = {
      idol_id: this.data.idol_index + 1
    }
    const idol_info = this.data.idol_info
    idol_info.is_attention = 2
    gets.followCancel(params).then(res => {
      this.setData({
        is_followcancel_show: false,
        idol_info: idol_info
      })
    })
  },
  // 选择发布类型
  choosePostType: function() {
    this.setData({
      is_post_show: true
    })
  },
  catchForumSubmit: function(e) {
    console.log(e.detail)
    this.setData({
      is_post_show: e.detail
    })
  },
  catchForumClose: function(e) {
    console.log(e.detail)
    this.setData({
      is_post_show: e.detail
    })
  },
  turnToPost: function() {
    wx.navigateTo({
      url: '/pages/editForum/index',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})