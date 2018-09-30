// pages/replyComment/index.js
const app = getApp()
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
    reply_content: '',
    placeholder: '',
    gender: '',
    genderTheme: {},
    comment_id: '',
    to_uid: '',
    reply_type: '',
    reply_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      comment_id: options.id,
      to_uid: options.uid,
      reply_type: options.type,
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      idolTheme: app.globalData.idolTheme,
      placeholder: `回复${options.uname}:`
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
  blur: function(e) {
    this.setData({
      reply_content: e.detail.value
    })
  },
  send: function() {
    const params={
      comment_id: this.data.comment_id,
      to_uid: this.data.to_uid,
      content: this.data.reply_content,
      reply_type: this.data.reply_type
    }
    ajax.replyComment(params).then(res => {
      wx.navigateBack({
        delta: 1
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))