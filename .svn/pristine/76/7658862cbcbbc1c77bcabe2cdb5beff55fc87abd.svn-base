// pages/genderTheme/index.js
const app = getApp()
import {
      wxRequest
} from '../../utils/promise.js'
Page({

      /**
       * 页面的初始数据
       */
      data: {
            gender: 2,
            genderTheme: []
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
            this.setData({
                  genderTheme: app.globalData.genderTheme
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
      selectTheme: function(e) {
            this.setData({
                  gender: parseInt(e.currentTarget.dataset.id)
            })
            if (this.data.gender == 1) {
                  wx.setNavigationBarColor({
                        frontColor: '#ffffff',
                        backgroundColor: this.data.genderTheme[0].sub,
                        animation: {
                              duration: 400,
                              timingFunc: 'easeIn'
                        }
                  })
            }
            if (this.data.gender == 2) {
                  wx.setNavigationBarColor({
                        frontColor: '#ffffff',
                        backgroundColor: this.data.genderTheme[1].sub,
                        animation: {
                              duration: 400,
                              timingFunc: 'easeIn'
                        }
                  })
            }
      },
      confirmGender: function(e) {
            app.globalData.gender = this.data.gender
            console.log(app.globalData.gender)
      },
      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function() {

      }
})