// pages/task/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
Page({
  /**

   * 页面的初始数据
   */
  data: {
    gender: 1,
    genderTheme: {},
    idolTheme: {},
    idol_index: 0,
    idol_info:[],
    task_list: [
      {
        task_id: '1',
        task_name: '签到',
        is_ing: 1,
        is_complete: false,
        point: [5],
      has_step:true
      },
      {
        task_id: '1',
        task_name: '浏览视频',
        is_ing: 1,
        is_complete: false,
        point: [10],
        has_step: true
      },
      {
        task_id: '1',
        task_name: '点赞视频',
        is_ing: 1,
        is_complete: false,
        point: [10],
        has_step: true
      },
      {
        task_id: '1',
        task_name: '评论视频',
        is_ing: 1,
        is_complete: false,
        point: [15],
        has_step: true
      },
      {
        task_id: '1',
        task_name: '编辑文字分享内容',
        is_ing: 1,
        is_complete: false,
        point: [15],
        has_step: true
      },
      {
        task_id: '1',
        task_name: '发布二次创作作品',
        is_ing: 1,
        is_complete: false,
        point: [100],
        has_step: false
      },
      {
        task_id: '1',
        task_name: '被官方推荐发布的作品',
        is_ing: 1,
        is_complete: false,
        point: [50, 500],
        has_step:false
      },
      // {
      //   task_id: '1',
      //   task_name: '购买商品',
      //   is_ing: 1,
      //   is_complete: false,
      //   point: [],
      //   point_content: '1RMB=1.5'
      // }
    ],
    is_rules_show:false,
    is_show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      idolTheme: app.globalData.idolTheme,
      idol_index: app.globalData.idol_index,
      idol_info:app.globalData.idol_list,
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
    })
 
    wx.setNavigationBarTitle({
      title: this.data.idol_info[this.data.idol_index].name,
    })
    console.log(this.data.idolTheme)
    console.log()
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.idolTheme[this.data.idol_index].main,
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
  follow:function(){
    this.setData({
      is_show: true
    })
  },
  getSuppportRules:function(){
    this.setData({
      is_rules_show: true
    })
  },
  closePopup:function(){
    this.setData({
      is_show:false,
      is_rules_show:false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})