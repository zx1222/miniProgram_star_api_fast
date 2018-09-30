// pages/userContribution/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
const {
  ajax,
  util,
  common,
  apiUrl,
  gets
} = getApp()

Page(Object.assign({}, common, {

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  turnToLeaderBoard: function(e) {
    const index =parseInt(e.currentTarget.dataset.id)-1
    app.globalData.idol_index = index
    wx.navigateTo({
      url: `/pages/fansLeaderBoard/index`,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      
    })
    this.getData();
  },
  getData: function() {
    gets.getContributionList('').then(res => {
      this.setData({
        list: res
      })
      console.log(this.data.list)
    })
  },
  turnToView:function(e){
    app.globalData.idol_index==parseInt(e.currentTarget.dataset.id)-1
    wx.navigateTo({
      url: '/pages/idolView/index?tab=0',
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))