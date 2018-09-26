// pages/fansLeaderBoard/index.js
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
    gender: 2,
    genderTheme: {},
    idolTheme: [],
    idol_index: 0,
    idol_list: [],
    list: [],
    selfRank: { },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme,
      idol_index: app.globalData.idol_index,
      idolTheme: app.globalData.idolTheme,
      idol_list: app.globalData.idol_list
    })
    wx.setNavigationBarTitle({
      title: `${this.data.idol_list[this.data.idol_index].short_name}粉丝贡献榜` //页面标题为路由参数
    })
    console.log(this.data.idolTheme)
    console.log(app.globalData.idol_index)
    this.getList()
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

  getList: function() {
    const params={
      id:this.data.idol_index+1
    }
    gets.getContributionRankList(params).then(res => {
      console.log(res)
      this.setData({
        list: res.contributionRank,
        selfRank: res.selfRank
      })
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))