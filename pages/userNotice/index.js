// pages/userNotice/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'

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
    tabArr: ['回复', '消息'],
    tabCurrent: 0,
    gender: 2,
    genderTheme: {},
    idol_index: 2,
    idolTheme: [],
    list: [],
    isLoading: false,
    current_page: 1,
    count_page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      idolTheme: app.globalData.idolTheme,
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
    this.setData({
      tabCurrent: 0
    })
    this.getNotice()
  },
  tapIndicator(e) {
    this.setData({
      tabCurrent: e.target.dataset.index
    });
    if (this.data.tabCurrent == 0) {
      this.getNotice();
    }
    if (this.data.tabCurrent == 1) {
      this.getMsg();
    }
  },
  getNotice: function() {
    const params = {
      page: 1,
      limits: 10
    }
    gets.getNotice(params).then(res => {
      console.log(res)
      if (res.items.length < params.limits) {
        this.setData({
          isLoading: false
        })
      }
      this.setData({
        list: res.items
      })
    })
  },
  getMsg: function() {
    const params = {
      page: 1,
      limits: 10
    }
    gets.getMsg(params).then(res => {
      if (res.items.length < params.limits) {
        this.setData({
          isLoading: false
        })
      }
      this.setData({
        list: res.items
      })
    })
  },
  turnToView:function(e){
    const id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/msgView/index?id=${id}`,
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
      page: ++this.data.current_page
    }
    var that = this
    gets.getNotice(params).then(res => {
      console.log(res)
      that.setData({
        list: that.data.list.concat(res.items),
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

  }
}))