// pages/editUserInfo/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_first_edit: 1,
    gender: 2,
    genderTheme: {},
    genderArr: [{
        name: '1',
        value: '男'
      },
      {
        name: '2',
        value: '女'
      },
    ],
    userInfo: {
      avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1788562038,3472846301&fm=26&gp=0.jpg',
      nickname: ''
    },
    birthday: {
      value: '1995-06-10',
      selected: false,
      valid: true
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      is_first_edit:parseInt(options.is_first_edit),
      gender: app.globalData.gender,
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

  },

  bindBirthdayChange: function(e) {
    console.log('sss')
    this.setData({
      birthday: {
        value: e.detail.value,
        selected: true,
        valid: true
      }
    })
  },
  saveChange:function(){
    if(this.data.is_first_edit==1){
      wx.navigateTo({
        url: '/pages/user/index',
      })
    }
    else{
      wx.navigateBack({
        delta:1
      })
    }
  },
  dropChange:function(){
    if (this.data.is_first_edit==1) {
      wx.navigateTo({
        url: '/pages/user/index',
      })
    }
    else {
      wx.navigateBack({
        delta: 1
      })
    }
  }
,
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