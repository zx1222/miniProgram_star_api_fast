// pages/user/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
const { gets,ajax, util, common } = getApp()

Page(Object.assign({}, common, gets,{

  /**
   * 页面的初始数据
   */
  data: {
    tab_bottom_id: 4,
    gender: 2,
    is_gender_selected: 1,
    is_seletpopup_show: true,
    genderThemeArr: [],
    genderTheme: {},
    user_info:{
      information_counts:0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(app.globalData.is_gender_selected)
    this.setData({
      gender: app.globalData.gender,
      is_gender_selected: app.globalData.is_gender_selected,
      genderThemeArr: app.globalData.genderTheme,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1]
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
    console.log(wx.getStorageSync('gender'))
    if (wx.getStorageSync('gender') !== '' && wx.getStorageSync('gender')!=undefined){
      app.globalData.is_gender_selected==1
      this.setData({
        is_gender_selected:1
      })
    }else{
      this.setData({
        is_gender_selected: 2
      })
    }

    gets.userInfo().then(res => {
      this.setData({
        user_info:res,
        avatar: res.headimg,
        nickname: res.nickname
      })
      this.setData({
        genderTheme: app.globalData.genderTheme[res.sex - 1]
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: this.data.genderTheme.main,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    })
  },
  turnToMyFollow: function() {
    wx.navigateTo({
      url: '/pages/userFollow/index',
    })
  },
  turnToMyContribution:function(){
    wx.navigateTo({
      url: '/pages/userContribution/index',
    })
  },
  turnToMyCollection:function(){
    wx.navigateTo({
      url: '/pages/userCollection/index',
    })
  },
  turnToMyForum:function(){
    wx.navigateTo({
      url: '/pages/userForum/index',
    })
  },
  turnToMyNotice: function () {
    wx.navigateTo({
      url: '/pages/userNotice/index',
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
  // 性别皮肤选择
  selectTheme: function(e) {
    this.setData({
      gender: parseInt(e.currentTarget.dataset.id)
    })
    console.log(this.data.gender)
   
    if (this.data.gender == 1) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: this.data.genderThemeArr[0].sub,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    }
    if (this.data.gender == 2) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: this.data.genderThemeArr[1].sub,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    }
  },
  confirmGender: function(e) {
    app.globalData.gender = this.data.gender
    app.globalData.is_gender_selected = 1;
    wx.setStorageSync('gender', this.data.gender)
    this.setData({
      is_seletpopup_show: false,
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[this.data.gender - 1],
    })
    const params={
      skin: this.data.gender
    }
    ajax.selectSkin(params).then(res => {
    })
  },

  turnToEditInfo: function() {
    wx.navigateTo({
      url: '/pages/editUserInfo/index?is_first_edit=2',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))