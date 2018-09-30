const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
const { ajax, util, common, apiUrl, gets } = getApp()

Page(Object.assign({}, common, {

  /**
   * 页面的初始数据
   */
  data: {
    gender: 2,
    genderTheme: {},
    idol_index: 2,
    idolTheme: [],
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      idolTheme: app.globalData.idolTheme
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
  turnToSupport: function(e) {
    app.globalData.idol_index = parseInt(e.currentTarget.dataset.index)-1
    wx.navigateTo({
      url: '/pages/task/index',
    })
  },
  turnToView:function(e){
    app.globalData.idol_index = parseInt(e.currentTarget.dataset.id) - 1
    const index = app.globalData.idol_index
    console.log(index)
    wx.navigateTo({
      url: `/pages/idolView/index?index=${index}`,
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
    this.getData()
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
getData:function(){
  gets.getFollowList('').then(res => {
    this.setData({
      list: res
    })
    console.log(this.data.list)
  })
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))