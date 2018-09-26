// pages/idolList/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'

const { ajax, util, common, apiUrl, gets } = getApp()

Page(Object.assign({}, common, gets, {

  /**
   * 页面的初始数据
   */
  data: {
    gender: 1,
    genderTheme: {},
    tab_id: 1,
    idol_index: 2,
    idolTheme: [],
    list: [],
    is_show: false,
    is_followcancel_show: false,
    toast_title: '浏览视频成功',
    toast_content: '你为清歌增加了10点人气值',
    is_toast_show: true
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
    this.getData();
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

  getData: function() {
    gets.getIdolList('').then(res => {
      this.setData({
        list: res
      })
      app.globalData.idol_list = res
    })
  },
  follow: function(e) {
    const params = {
      idol_id: parseInt(e.currentTarget.dataset.id),
    }
    const idol_index = parseInt(e.currentTarget.dataset.id)-1;
    const idol_list=this.data.list;
    idol_list[idol_index].isattention=1
    gets.follow(params).then(res => {
      this.setData({
        idol_index: idol_index,
        list: idol_list,
        is_show: true
      })
    })
  
  },
  followCancel: function(e) {
    this.setData({
      idol_index: parseInt(e.currentTarget.dataset.id)-1,
      is_followcancel_show: true
    })
  },
  turnToSupport: function() {
    wx.navigateTo({
      url: '/pages/task/index',
    })
  },
  turnToView: function(e) {
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/idolView/index?index=${index}`,
    })
    app.globalData.idol_index = index
  },
  closePopup: function() {
    this.setData({
      is_show: false
    })
  },
  catchCancel: function(e) {
    this.setData({
      is_followcancel_show: false
    })
  },
  catchConfirm: function(e) {
    const params = {
      idol_id: this.data.idol_index+1
    }
    const idol_index =this.data.idol_index;
    const idol_list = this.data.list;
    console.log(idol_list)
    idol_list[idol_index].isattention = 2
    gets.followCancel(params).then(res => {
      this.setData({
        is_followcancel_show: false,
        list: idol_list
      })
      console.log(res)
      // this.setData({
      //   list: res
      // })
      // app.globalData.idol_list = res

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))